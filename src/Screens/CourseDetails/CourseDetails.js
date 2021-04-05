import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableWithoutFeedback, ScrollView, Share, TouchableOpacity, Image, Alert, RefreshControl } from 'react-native';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import { green } from '../../Components/Colors/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalRegisterInfo from '../../Modals/ModalRegisterInfo/ModalRegisterInfo';
import { loading } from '../../Helpers/Functions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { width, height } from '../../Components/Dimensions/Dimensions';
import { connect } from 'react-redux';
import getCourseDetails from '../../Api/getCourseDetails';
import { images } from '../../Constants';

class CourseDetails extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            modalRegisterInfoVisible: false,
            loaded: false,
            activeSlide: 0,
            refreshScreen: false,
            course: {}
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                this.getCourseDetails(this.props.route.params.courseId)
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded &&
                this.state.course != nextState.course) {
            return true
        }
        else if(this.state.modalRegisterInfoVisible != nextState.modalRegisterInfoVisible) {
            return true
        }
        else if(this.state.activeSlide != nextState.activeSlide) {
            return true
        }
        return false
    }

    async componentDidUpdate(prevProps) {
        if((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) { 
            this.componentDidMount()
        }
    }

    getCourseDetails = async(courseId) => {
        try {
            this.setState({ 
                loaded: false,
                course: {} 
            })
            var course = {}
            const res = await getCourseDetails(courseId);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    if(Object.keys(resp.data).length > 0) {
                        course = resp.data.detailCourse
                        this.setState({ 
                            loaded: true,
                            course
                        })
                    }
                    else {
                        this.setState({ 
                            loaded: true,
                            course
                        })
                        Alert.alert('Thông báo', 'Không có dữ liệu đơn hàng')
                        goBack()
                    }
                }
                else if(resp.code == 204) {
                    this.setState({ loaded: true })
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
        }
        catch(error) {
            this.setState({ loaded: true })
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getCourseDetails(courseId)}
                ]
            )
        }
    }
    
    goBack = () => {
        goBack()
    }

    share = async() => {
        try {
            const result = await Share.share({
                    title: this.state.course.name,
                    message: this.state.course.link && this.state.course.link != '' ? this.state.course.link : '',
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                    } else if (result.action === Share.dismissedAction) {
                    // dismissed
                    }
            } catch (error) {
                console.log(error)
                Alert.alert('Lỗi', 'Không thể chia sẻ, hãy thử lại sau')
        }
    }

    setLoadedData = () => {
        this.setState({ loaded: true })
    }

    setUnLoadedData = () => {
        this.setState({ loaded: false })
    }

    openModalRegisterInfo = () => {
        this.setState({ modalRegisterInfoVisible: true })
    }

    closeModalRegisterInfo = () => {
        this.setState({ modalRegisterInfoVisible: false })
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefreshScreen = () => {
        if(this.props.obj.internetConnection) {
            this.getCourseDetails(this.state.course.id)
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại khóa học')
        }
    }

    renderImage = ({ item, index }) => {
        return (
            <Image
                style={styles.image}
                source={{ uri: item }}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {!this.state.loaded ? loading() : null}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableWithoutFeedback onPress={this.goBack}>
                                <Icon
                                    name='chevron-back'
                                    color='#fff'
                                    size={30}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={this.share}>
                                <Icon
                                    name='share-social-sharp'
                                    color='#fff'
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                {Object.keys(this.state.course).length > 0 ?
                    <ScrollView
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefreshScreen} />
                        }
                    > 
                        {this.state.course.images.length == 0 ?
                            <View style={styles.noImageWrapper}>
                                <Image
                                    style={styles.noImage}
                                    source={images.noImage}
                                />
                            </View>
                               :
                            <View style={styles.imageSlide}>
                                <Carousel
                                    layout={"default"}
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.course.images}
                                    renderItem={this.renderImage}
                                    sliderWidth={width}
                                    itemWidth={width}
                                    onSnapToItem = { index => this.setState({ activeSlide: index }) }
                                />
                                <Pagination
                                    dotsLength={this.state.course.images ? this.state.course.images.length : 0}
                                    activeDotIndex={this.state.activeSlide}
                                    containerStyle={{ 
                                        backgroundColor: '#fff', 
                                        paddingBottom: 15,
                                        paddingTop: 5 
                                    }}
                                    dotStyle={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        marginHorizontal: 8,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                    }}
                                    inactiveDotStyle={{
                                        // Define styles for inactive dots here
                                    }}
                                    inactiveDotOpacity={0.4}
                                    inactiveDotScale={0.6}
                                />
                            </View>
                        }

                        <View style={styles.content}>
                            <Text style={styles.orderTitle}>
                                {this.state.course.name}
                            </Text>
                            <View style={styles.locationWrapper}>
                                <View style={styles.locationInside}>
                                    <View style={styles.left}>
                                        <Icon
                                            name='location-sharp'
                                            color='red'
                                            size={22}
                                        />
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.location}>
                                            {this.state.course.location}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Icon
                                        name='wallet-outline'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Lương cơ bản:  <Text style={styles.highlight}>{this.state.course.salary}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Icon
                                        name='share-outline'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Yêu cầu trình độ:  <Text style={styles.highlight}>{this.state.course.level}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Icon
                                        name='briefcase-outline'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Yêu cầu kinh nghiệm:  <Text style={styles.highlight}>{this.state.course.experience}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Icon
                                        name='fitness-outline'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Độ tuổi:  <Text style={styles.highlight}>{this.state.course.age}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Icon
                                        name='people-outline'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Số lượng:  <Text style={styles.highlight}>{this.state.course.amount}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <View style={[styles.left, { alignItems: 'center' }]}>
                                    <FontAwesome
                                        name='building-o'
                                        size={20}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Công việc:  <Text style={styles.highlight}>{this.state.course.job}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <View style={styles.left}>
                                    <Icon
                                        name='git-pull-request'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={[styles.rowTitle, { lineHeight: 25 }]}>Yêu cầu khác: </Text>
                                    <Text style={[styles.highlight, { marginLeft: 5 }]}>{this.state.course.require}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Icon
                                        name='timer-outline'
                                        size={22}
                                        color={green}
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.rowTitle}>
                                        Giờ làm việc:  <Text style={styles.highlight}>{this.state.course.time_work}</Text>
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.separateWrapper}>
                                <View style={styles.separate}></View>
                            </View>

                            <Text style={styles.contentTitle}>Phúc lợi:</Text>
                            <Text style={styles.contentText}>
                                {this.state.course.benefit}
                            </Text>

                            <View style={styles.separateWrapper}>
                                <View style={styles.separate}></View>
                            </View>

                            <Text style={styles.contentTitle}>Mô tả công việc:</Text>
                            <Text style={styles.contentText}>
                                {this.state.course.description}
                            </Text>

                            <View style={styles.separateWrapper}>
                                <View style={styles.separate}></View>
                            </View>

                            <Text style={styles.contentTitle}>Lịch tham gia:</Text>
                            <Text style={styles.contentText}>
                                {this.state.course.time_expire}
                            </Text>

                            <View style={styles.separateWrapper}>
                                <View style={styles.separate}></View>
                            </View>

                            <Text style={styles.contentTitle}>Thông tin liên hệ:</Text>
                            <Text style={styles.contentText}>
                                {this.state.course.contact}
                            </Text>

                            <View style={styles.separateWrapper}>
                                <View style={styles.separate}></View>
                            </View>

                            <Text style={styles.contentTitle}>Lưu ý:</Text>
                            <Text style={styles.contentText}>
                                {this.state.course.note}
                            </Text>
                        </View>
                    </ScrollView> : null
                }

                {Object.keys(this.state.course).length > 0 ?
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.openModalRegisterInfo}
                    >
                        <Text style={styles.btnTitle}>ỨNG TUYỂN NGAY</Text>
                    </TouchableOpacity> : null
                }

                    {/* MODAL REGISTER INFO */}
                        <ModalRegisterInfo
                            modalRegisterInfoVisible={this.state.modalRegisterInfoVisible}
                            closeModalRegisterInfo={this.closeModalRegisterInfo}
                            setLoadedData={this.setLoadedData}
                            setUnLoadedData={this.setUnLoadedData}
                            course={this.state.course}
                            internetConnection={this.props.obj.internetConnection}
                        />
                    {/* MODAL REGISTER INFO */}
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { obj } = state
    return { obj }
};

export default connect(mapStateToProps)(CourseDetails);

const tagsStyles = {
    h1: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    h2: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14.5,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    h3: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    h4: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    h5: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    h6: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    span: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal',
        fontStyle: 'normal'
    },
    p: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    b: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'normal'
    },
    i: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10
    },
    em: {
        fontFamily: 'Montserrat-Light', 
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 10,
    },
    a: {
        fontFamily: 'Montserrat-Medium', 
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 10,
    },
    img: {
        width: width - 30,
        height: height/4,
        marginVertical: 10
    },
}
