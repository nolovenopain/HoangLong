import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, Image, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native';
import { green } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import { loading } from '../../Helpers/Functions';
import getCourseList from '../../Api/getCourseList';
import moment from 'moment';
import getCategoryList from '../../Api/getCategoryList';
import { connect } from 'react-redux';
import { images } from '../../Constants';

class Course extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            courseList: [],
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
            page: 1,
            categoryId: '',
            tabCourse: []
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                const categoryList = await this.getCategoryList()
                var tabCourse = []
                if(categoryList.length > 0) {
                    categoryList.map((value, key) => {
                        tabCourse.push(
                            {
                                id: value.id,
                                name: value.name,
                                active: key == 0 ? true : false
                            }
                        )
                    })
                    const data = await this.getCourseList(categoryList[0].id)
                    if(data.dataCourse.length < 10) {
                        this.setState({ 
                            handleLoadMore: false, 
                            itemLoading: false,
                            loaded: true, 
                            courseList: data.dataCourse,
                            tabCourse,
                            categoryId: categoryList[0].id
                        })
                    } 
                    else {
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            loaded: true,
                            courseList: data.dataCourse,
                            tabCourse,
                            categoryId: categoryList[0].id
                        })
                    }
                }
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.handleLoadMore != nextState.handleLoadMore || 
            this.state.courseList != nextState.courseList ||
            this.state.refresh != nextState.refresh ||
            this.props.obj.internetConnection != nextProps.obj.internetConnection ||
            this.props.obj.notiTypeCourseCount != nextProps.obj.notiTypeCourseCount) {
                return true
            }
        return false
    }

    componentDidUpdate(prevProps) {
        if( ((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) ||
                prevProps.obj.notiTypeCourseCount != this.props.obj.notiTypeCourseCount) { 
            this.setState({
                page: 1,
                loaded: false,
                courseList: [], 
                categoryId: ''
            }, async() => {
                const categoryList = await this.getCategoryList()
                var tabCourse = []
                if(categoryList.length > 0) {
                    categoryList.map((value, key) => {
                        tabCourse.push(
                            {
                                id: value.id,
                                name: value.name,
                                active: key == 0 ? true : false
                            }
                        )
                    })
                    const data = await this.getCourseList(categoryList[0].id)
                    if(data.dataCourse.length < 10) {
                        this.setState({ 
                            handleLoadMore: false, 
                            itemLoading: false,
                            loaded: true, 
                            courseList: data.dataCourse,
                            tabCourse,
                            categoryId: categoryList[0].id
                        })
                    } 
                    else {
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            loaded: true,
                            courseList: data.dataCourse,
                            tabCourse,
                            categoryId: categoryList[0].id
                        })
                    }
                }
            })
        }
    }

    getCategoryList = async() => {
        try {
            var data = []
            const res = await getCategoryList('course');
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    data = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return data
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getCategoryList()}
                ]
            )
        }
    }

    getCourseList = async(categoryId) => {
        try {
            var data = {}
            const res = await getCourseList(categoryId, this.state.page);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    data = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return data
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getCourseList(categoryId)}
                ]
            )
        }
    }

    chooseTabCourse = item => e => {
        this.setState({ loaded: false })
        var tabCourse = [];
        this.state.tabCourse.map((value, key) => {
            if(item.id == value.id) {
                value.active = true
            }
            else {
                value.active = false
            }
            tabCourse.push(value)
        });
        this.setState({ 
            tabCourse,
            page: 1,
            categoryId: item.id,
        }, async() => {
            if(this.props.obj.internetConnection) {
                const data = await this.getCourseList(this.state.categoryId)
                if(data.dataCourse.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        loaded: true, 
                        courseList: data.dataCourse,
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        loaded: true,
                        courseList: data.dataCourse,
                    })
                }
            }
            else {
                Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại danh sách khóa học')
            }
        })
    }

    goToCourseDetails = course => e => {
        navigate('CourseDetails', { courseId: course.id })
    }

    goToSearch = () => {
        navigate('Search', { type: 'course' })
    }

    goBack = () => {
        goBack()
    }

    renderFooter = () => {
        return( 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large' color='rgba(0,0,0,0.4)'/>
            </View>
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  async() => {  
                const data = await this.getCourseList(this.state.categoryId)
                if(data.dataCourse.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        courseList: [...this.state.courseList,...data.dataCourse],
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        courseList: [...this.state.courseList,...data.dataCourse],
                    })
                }
            });       
    }

    refresh = () => {
        this.setState({ 
            page: 1,
            refresh: true,
            courseList: [],
            categoryId: ''
        },  async() => {
                if(this.props.obj.internetConnection) {
                    const categoryList = await this.getCategoryList()
                    var tabCourse = []
                    if(categoryList.length > 0) {
                        categoryList.map((value, key) => {
                            tabCourse.push(
                                {
                                    id: value.id,
                                    name: value.name,
                                    active: key == 0 ? true : false
                                }
                            )
                        })
                        const data = await this.getCourseList(categoryList[0].id)
                        if(data.dataCourse.length < 10) {
                            this.setState({ 
                                handleLoadMore: false, 
                                itemLoading: false, 
                                courseList: data.dataCourse,
                                tabCourse,
                                categoryId: categoryList[0].id,
                                refresh: false
                            })
                        } 
                        else {
                            this.setState({
                                itemLoading: true,
                                handleLoadMore: true,
                                courseList: data.dataCourse,
                                tabCourse,
                                categoryId: categoryList[0].id,
                                refresh: false
                            })
                        }
                    }
                }
                else {
                    Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại dánh sách khóa học')
                }
            }
        );
    }

    scrollToTop = () => {
        if(this.state.courseList.length > 0) {
            this.courseListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }
    
    renderRow = ({ item, index }) => { 
        return (
            <TouchableWithoutFeedback 
                onPress={this.goToCourseDetails(item)} 
                key={index}
            >
                <View style={
                        [
                            styles.elementListBody,
                            { borderColor: index == this.state.courseList.length - 1 ? '#fff' : 'silver' }
                        ]
                    }
                >
                    <View style={styles.elementListBodyLeft}>
                        <Image
                            style={styles.elementImage}
                            source={item.images.length > 0 ? { uri: item.images[0] } : images.noImage}
                        />
                    </View>
                    <View style={styles.elementListBodyRight}>
                        <Text 
                            style={styles.elementTitle}
                            numberOfLines={1}    
                        >
                            {item.name}
                        </Text>
                        <View style={styles.rightRow}>
                            <Icon
                                name='pin'
                                size={18}
                                color={green}
                            />
                        <Text
                            style={styles.rightRowText}
                            numberOfLines={1}
                        >
                            {item.location}
                        </Text>
                        </View>
                        <View style={styles.rightRow}>
                            <Icon
                                name='logo-usd'
                                size={18}
                                color={green}
                            />
                            <Text
                                style={styles.rightRowText}
                                numberOfLines={1}
                            >
                                {item.salary}
                            </Text>
                        </View>
                        <View style={styles.rightRow}>
                            <Icon
                                name='timer-outline'
                                size={18}
                                color={green}
                            />
                            <Text
                                style={styles.rightRowText}
                                numberOfLines={1}
                            >
                                {moment(item.created_at).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderRowTabCourse = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.chooseTabCourse(item)}>
                <View 
                    style={
                            [
                                styles.headerBodyTab,
                                { marginLeft: index == 0 ? 15 : 20 }
                            ]
                        }
                >
                    <Text 
                        style={
                            [
                                styles.headerBodyTabTitle,
                                { fontFamily: item.active ? 'Montserrat-Medium' : 'Montserrat-Regular' }
                            ]
                        }
                    >
                        {item.name}
                    </Text>
                    <View style={
                            {   
                                width: 100,
                                borderBottomWidth: item.active ? 1 : 0,
                                borderColor: item.active ? green : '#fff' 
                            }
                        }
                    >

                    </View>
                </View>
            </TouchableWithoutFeedback>
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
                            <Text style={styles.headerTitle}>Đơn hàng</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableWithoutFeedback onPress={this.goToSearch}>
                                <Icon
                                    name='search'
                                    color='#fff'
                                    size={25}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={styles.headerBodyTabWrapper}>
                        {this.state.tabCourse.length > 0 ?
                            <FlatList
                                data={this.state.tabCourse}
                                renderItem={this.renderRowTabCourse}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            /> : null
                        }
                    </View>

                    <View style={styles.body}>
                        {!this._isMounted && !this.state.loaded ? null : 
                            this.state.courseList.length > 0 ?
                                <FlatList
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    ref={(ref) => { this.courseListRef = ref }}
                                    data={this.state.courseList}
                                    refreshing={this.state.refresh}
                                    onRefresh={this.refresh}
                                    renderItem={this.renderRow}
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReached={this.state.handleLoadMore && this.props.obj.internetConnection ? this.handleLoadMore : null}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                    disableVirtualization={true}
                                    showsVerticalScrollIndicator={false}
                                />
                                : 
                                <Text style={styles.noData}>Không có dữ liệu</Text>
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { obj } = state
    return { obj }
};

export default connect(mapStateToProps)(Course);
