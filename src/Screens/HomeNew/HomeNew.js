import React, { Component } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, View, Text, TouchableWithoutFeedback, Alert, ImageBackground } from 'react-native';
import { navigate } from '../../Navigators/Router';
import { styles } from './css';
import { loading } from '../../Helpers/Functions';
import getHomeList from '../../Api/getHomeList';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { width } from '../../Components/Dimensions/Dimensions';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { images } from '../../Constants';

class HomeNew extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            // bannerList: [],
            // loaded: false,
            // refreshScreen: false,
            // homeList: {},
            // activeSlide: 0,
        };
    }

    componentDidMount() {
        this._isMounted = true
        // setTimeout(async() => {
        //     if(this._isMounted) {
        //         const homeList = await this.getHomeList()
        //         console.log(homeList)
        //         this.setState({
        //             loaded: true,
        //             bannerList: homeList.dataBanner,
        //             homeList
        //         })
        //     }
        // }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(this.state.loaded != nextState.loaded) {
    //         return true
    //     }
    //     else if(this.state.refreshScreen != nextState.refreshScreen) {
    //         return true
    //     }
    //     else if(this.state.activeSlide != nextState.activeSlide) {
    //         return true
    //     }
    //     return false
    // }

    // getHomeList = async() => {
    //     try {
    //         var homeList = {}
    //         const res = await getHomeList();
    //         if(res.status == 200) {
    //             const resp = await res.json()
    //             if(resp.code == 200) {
    //                 homeList = resp.data
    //             }
    //             else if(resp.code == 204) {
    //                 console.log(resp)
    //             }
    //         }
    //         else if(res.status == 500) {
    //             Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
    //         }
    //         return homeList
    //     }
    //     catch(error) {
    //         console.log(error)
    //         Alert.alert(
    //             'Sorry, something went wrong. Please try again',
    //             error.message,
    //             [
    //                 {text: 'Try Again', onPress: () => this.getHomeList()}
    //             ]
    //         )
    //     }
    // }

    goToCourse = () => {
        navigate('Course')
    }

    goToNews = () => {
        navigate('News')
    }

    goToEducationProcess = () => {
        navigate('EducationProcess')
    }

    goToSupport = () => {
        navigate('Support')
    }

    goToPromotion = () => {
        navigate('Promotion')
    }

    goToShare = () => {
        navigate('Share')
    }

    // wait = (timeout) => {
    //     return new Promise(resolve => {
    //         setTimeout(resolve, timeout);
    //     });
    // }

    // onRefreshScreen = () => {
    //     this.setState({ refreshScreen: true });
    //     this.componentDidMount();
    //     this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    // }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                {/* {!this.state.loaded ? loading() : null} */}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>

                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Trang chủ</Text>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}
                        // refreshControl={
                        //     <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefreshScreen} />
                        // }
                    >
                        <ImageBackground
                            source={images.backgroundHome}
                            style={styles.homeBackground}
                            resizeMode='contain'
                        >
                            <View style={styles.bodyHeader}>
                                <Image
                                    source={require('../../Assets/Images/logo1.png')}
                                    style={styles.logo}
                                    resizeMode='contain'
                                />
                                {Object.keys(this.props.obj.info).length > 0 && this.props.obj.userToken ? 
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.name}>{this.props.obj.info.name}</Text>
                                        <Text style={styles.username}>{this.props.obj.info.username}</Text>
                                    </View> : null
                                }   
                            </View>

                            <View style={styles.row}>
                                <View style={styles.rowLeft}>
                                    <TouchableWithoutFeedback onPress={this.goToEducationProcess}>
                                        <View style={styles.iconBox}>
                                            <MaterialCommunityIcon
                                                name='text-box-search-outline'
                                                color={green}
                                                size={35}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.iconBoxTitle}>TT của tôi</Text>
                                </View>
                                <View style={styles.rowCenter}>
                                    <TouchableWithoutFeedback onPress={this.goToCourse}>
                                        <View style={styles.iconBox}>
                                            <MaterialCommunityIcon
                                                name='file-document-outline'
                                                color={green}
                                                size={35}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.iconBoxTitle}>Đơn hàng</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <TouchableWithoutFeedback onPress={this.goToNews}>
                                        <View style={styles.iconBox}>
                                            <MaterialCommunityIcon
                                                name='newspaper-variant'
                                                color={green}
                                                size={35}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.iconBoxTitle}>Tin tức</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.rowLeft}>
                                    <TouchableWithoutFeedback onPress={this.goToSupport}>
                                        <View style={styles.iconBox}>
                                            <MaterialCommunityIcon
                                                name='crosshairs-question'
                                                color={green}
                                                size={35}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.iconBoxTitle}>Hỗ trợ</Text>
                                </View>
                                <View style={styles.rowCenter}>
                                    {/* <TouchableWithoutFeedback onPress={this.goToPromotion}>
                                        <View style={styles.iconBox}>
                                            <MaterialCommunityIcon
                                                name='gift-outline'
                                                color={green}
                                                size={35}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.iconBoxTitle}>Ưu đãi</Text> */}
                                </View>
                                <View style={styles.rowRight}>
                                    {/* <TouchableWithoutFeedback onPress={this.goToShare}>
                                        <View style={styles.iconBox}>
                                            <MaterialCommunityIcon
                                                name='format-list-checkbox'
                                                color={green}
                                                size={35}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.iconBoxTitle}>Danh sách giới thiệu</Text> */}
                                </View>
                            </View>
                        </ImageBackground>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { obj } = state
    return { obj }
};

export default connect(mapStateToProps)(HomeNew);
