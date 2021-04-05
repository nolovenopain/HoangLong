import React, { Component } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, View, FlatList, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import { width } from '../../Components/Dimensions/Dimensions';
import { navigate } from '../../Navigators/Router';
import { loading } from '../../Helpers/Functions';
import getHomeList from '../../Api/getHomeList';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import { connect } from 'react-redux';

class HomeOld extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            searchKey: '',
            refreshScreen: false,
            bannerList: [],
            activeSlide: 0,
            tabCourse: [],
            courseElementList: [],
            tabNews: [],
            newsElementList: [],
            homeList: {}
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                const homeList = await this.getHomeList()
                console.log(homeList)
                var tabCourse = [];
                if(homeList.categoryCourse.length > 0) {
                    homeList.categoryCourse.map((value, key) => {
                        tabCourse.push(
                            {
                                id: value.id,
                                name: value.name,
                                active: key == 0 ? true : false
                            }
                        )
                    })
                }

                var tabNews = [];
                if(homeList.categoryNews.length > 0) {
                    homeList.categoryNews.map((value, key) => {
                        tabNews.push(
                            {
                                id: value.id,
                                name: value.name,
                                active: key == 0 ? true : false
                            }
                        )
                    })
                }
                this.setState({
                    loaded: true,
                    bannerList: homeList.dataBanner,
                    homeList,
                    tabCourse,
                    tabNews,
                    courseElementList: homeList.dataCourse[0],
                    newsElementList: homeList.dataNews[0]
                })
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded) {
            return true
        }
        else if(this.state.refreshScreen != nextState.refreshScreen) {
            return true
        }
        else if (this.state.tabCourse != nextState.tabCourse) {
            return true
        }
        else if(this.state.tabNews != nextState.tabNews) {
            return true
        }
        else if(this.state.activeSlide != nextState.activeSlide) {
            return true
        }
        return false
    }

    getHomeList = async() => {
        try {
            var homeList = {}
            const res = await getHomeList();
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    homeList = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return homeList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getHomeList()}
                ]
            )
        }
    }

    goToSearch = () => {
        navigate('Search')
    }

    chooseTabCourse = item => e => {
        var tabCourse = [];
        var index = 0;
        this.state.tabCourse.map((value, key) => {
            if(item.id == value.id) {
                value.active = true
                index = key
            }
            else {
                value.active = false
            }
            tabCourse.push(value)
        });
        this.setState({ 
            tabCourse,
            courseElementList: this.state.homeList.dataCourse[index]
        })
    }
    
    chooseTabNews = item => e => {
        var tabNews = [];
        var index = 0;
        this.state.tabNews.map((value, key) => {
            if(item.id == value.id) {
                value.active = true
                index = key
            }
            else {
                value.active = false
            }
            tabNews.push(value)
        });
        this.setState({ 
            tabNews,
            newsElementList: this.state.homeList.dataNews[index] 
        })
    }

    goToCourseDetails = course => e => {
        navigate('CourseDetails', { course })
    }

    goToNewsDetails = news => e => {
        navigate('NewsDetails', { news })
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefreshScreen = () => {
        this.setState({ refreshScreen: true });
        this.componentDidMount();
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    goToCourseList = () => {
        navigate('CourseList', {
            firstCategoryId: this.state.homeList.categoryCourse[0].id
        })
    }

    goToNewsList = () => {
        navigate('NewsList', {
            firstCategoryId: this.state.homeList.categoryNews[0].id
        })
    }

    renderBanner = ({ item, index }) => {
        return (
            <Image
                style={styles.banner}
                source={{ uri: item.image }}
            />
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

    renderRowTabNews = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.chooseTabNews(item)}>
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
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                {!this.state.loaded ? loading() : null}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableWithoutFeedback onPress={this.goToSearch}>
                            <View style={styles.searchBarWrapper}>
                                <View style={styles.iconWrapper}> 
                                    <Icon
                                        name='search'
                                        color='gray'
                                        size={20}
                                    />
                                </View>
                                <View style={styles.searchBar}>
                                    <Text style={styles.search}>Tìm đơn hàng</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefreshScreen} />
                        }
                        contentContainerStyle={styles.body}
                    >
                        <View style={styles.bannerWrapper}>
                            <Carousel
                                layout={"default"}
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.bannerList}
                                renderItem={this.renderBanner}
                                sliderWidth={width}
                                itemWidth={width}
                                onSnapToItem = { index => this.setState({ activeSlide: index }) }
                            />
                            <Pagination
                                dotsLength={this.state.bannerList.length}
                                activeDotIndex={this.state.activeSlide}
                                containerStyle={{ 
                                    backgroundColor: '#fff', 
                                    paddingBottom: 5,
                                    paddingTop: 15 
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
                        <View style={styles.headerBodyTabWrapper}>
                            <FlatList
                                data={this.state.tabCourse}
                                renderItem={this.renderRowTabCourse}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            />
                        </View>

                        <View style={styles.shortlist}>
                            {this.state.courseElementList.map((value, key) => {
                                return(
                                    <TouchableWithoutFeedback 
                                        onPress={this.goToCourseDetails(value)} 
                                        key={key}
                                    >
                                        <View style={
                                                [
                                                    styles.elementListBody,
                                                    { borderColor: key == this.state.courseElementList.length - 1 ? '#fff' : 'silver' }
                                                ]
                                            }
                                        >
                                            <View style={styles.elementListBodyLeft}>
                                                <Image
                                                    style={styles.elementImage}
                                                    source={{ uri: value.images[0] }}
                                                />
                                            </View>
                                            <View style={styles.elementListBodyRight}>
                                                <Text 
                                                    style={styles.elementTitle}
                                                    numberOfLines={1}    
                                                >
                                                    {value.name}
                                                </Text>
                                                <View style={styles.rightRow}>
                                                    <Icon
                                                        name='pin'
                                                        size={16}
                                                        color={green}
                                                    />
                                                    <Text
                                                        style={styles.rightRowText}
                                                        numberOfLines={1}
                                                    >
                                                        {value.location}
                                                    </Text>
                                                </View>
                                                <View style={styles.rightRow}>
                                                    <Icon
                                                        name='logo-usd'
                                                        size={16}
                                                        color={green}
                                                    />
                                                    <Text
                                                        style={styles.rightRowText}
                                                        numberOfLines={1}
                                                    >
                                                        {value.salary}
                                                    </Text>
                                                </View>
                                                <View style={styles.rightRow}>
                                                    <Icon
                                                        name='timer-outline'
                                                        size={16}
                                                        color={green}
                                                    />
                                                    <Text
                                                        style={styles.rightRowText}
                                                        numberOfLines={1}
                                                    >
                                                        {moment(value.time_expire).format('DD/MM/YYYY')}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        </View>

                        {this.state.loaded && this.state.courseElementList.length > 0 ?
                            <View style={styles.viewMoreWrapper}>
                                <TouchableWithoutFeedback onPress={this.goToCourseList}>
                                    <View style={styles.viewMore}>
                                        <Text style={styles.viewMoreTitle}>Xem thêm</Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={15}
                                            color={green}
                                            style={{ marginLeft: 3, marginTop: 3 }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View> : null
                        }
                        

                        <View style={styles.headerBodyTabWrapper}>
                            <FlatList
                                data={this.state.tabNews}
                                renderItem={this.renderRowTabNews}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            />
                        </View>

                        <View style={styles.shortlist}>
                            {this.state.newsElementList.map((value, key) => {
                                return(
                                    <TouchableWithoutFeedback 
                                        onPress={this.goToNewsDetails(value)} 
                                        key={key}
                                    >
                                        <View style={
                                                [
                                                    styles.elementListBody,
                                                    { borderColor: key == this.state.newsElementList.length - 1 ? '#fff' : 'silver' }
                                                ]
                                            }
                                        >
                                            <View style={styles.elementListBodyLeft}>
                                                <Image
                                                    style={styles.elementImage}
                                                    source={{ uri: value.image }}
                                                />
                                            </View>
                                            <View style={styles.elementListBodyRight}>
                                                <Text 
                                                    style={styles.elementTitle}
                                                    numberOfLines={2}    
                                                >
                                                    {value.title}
                                                </Text>
                                                <View style={styles.rightElement}>                               
                                                    <Text
                                                        style={styles.elementText}
                                                        numberOfLines={1}
                                                    >
                                                        {value.content}
                                                    </Text>
                                                </View>                                           
                                                <View style={styles.rightElement}>
                                                    <Text
                                                        style={styles.elementText}
                                                        numberOfLines={1}
                                                    >
                                                        {value.time}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        </View>

                        {this.state.loaded && this.state.newsElementList.length > 0 ?
                            <View style={[styles.viewMoreWrapper, { marginBottom: 20 }]}>
                                <TouchableWithoutFeedback onPress={this.goToNewsList}>
                                    <View style={styles.viewMore}>
                                        <Text style={styles.viewMoreTitle}>Xem thêm</Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={15}
                                            color={green}
                                            style={{ marginLeft: 3, marginTop: 3 }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View> : null
                        }
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

export default connect(mapStateToProps)(HomeOld);
