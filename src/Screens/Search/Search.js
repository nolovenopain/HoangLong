import React, { Component } from 'react';
import { Image, SafeAreaView, View, FlatList, Text, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { width } from '../../Components/Dimensions/Dimensions';
import { goBack, navigate } from '../../Navigators/Router';
import { loading } from '../../Helpers/Functions';
import getCourseSearchList from '../../Api/getCourseSearchList';
import getNewsSearchList from '../../Api/getNewsSearchList';
import moment from 'moment';
import { connect } from 'react-redux';

class Search extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            searchKey: '',
            refresh: false,
            searchList: [],
            itemLoading: false,
            handleLoadMore: false,
            page: 1
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.handleLoadMore != nextState.handleLoadMore ||
            this.state.refresh != nextState.refresh ||
            this.state.searchList != nextState.searchList) {
            return true
        }
        return false
    }

    getCourseSearchList = async() => {
        try {
            var searchList = []
            const res = await getCourseSearchList(this.state.searchKey, this.state.page);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    searchList = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return searchList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getCourseSearchList()}
                ]
            )
        }
    }

    getNewsSearchList = async() => {
        try {
            var searchList = []
            const res = await getNewsSearchList(this.state.searchKey, this.state.page);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    searchList = resp.data.news
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return searchList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getNewsSearchList()}
                ]
            )
        }
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
        if(value == '') {
            this.setState({ searchList: [] })
        }
    }

    search = async() => {
        if(this.props.obj.internetConnection) {
            if(this.state.searchKey != '') {
                this.setState({ loaded: false })
                const searchList = this.props.route.params.type == 'course' ? await this.getCourseSearchList() : await this.getNewsSearchList()
                if(searchList.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false, 
                        searchList,
                        loaded: true
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        searchList,
                        loaded: true
                    })
                }
            }
            else {
                this.setState({ searchList: [] })
            }
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tìm kiếm')
        }
    }

    goToCourseDetails = course => e => {
        navigate('CourseDetails', { course })
    }

    goToNewsDetails = news => e => {
        navigate('NewsDetails', { news })
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
                const searchList = this.props.route.params.type == 'course' ? await this.getCourseSearchList() : await this.getNewsSearchList()
                if(data.dataNews.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        searchList: [...this.state.searchList,...searchList],
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        searchList: [...this.state.searchList,...searchList],
                    })
                }
            });       
    }

    refresh = () => {
        this.setState({ 
            page: 1,
            refresh: true
        },  async() => {
                if(this.props.obj.internetConnection) {
                    const searchList = this.props.route.params.type == 'course' ? await this.getCourseSearchList() : await this.getNewsSearchList()
                    if(searchList.length < 10) {
                        this.setState({ 
                            handleLoadMore: false, 
                            itemLoading: false, 
                            refresh: false,
                            searchList
                        })
                    } 
                    else {
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            refresh: false,
                            searchList
                        })
                    }
                }
                else {
                    Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại dánh sách tìm kiếm')
                }
            }
        );
    }

    scrollToTop = () => {
        if(this.state.searchList.length > 0) {
            this.searchListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }
    
    renderRowCourse = ({ item, index }) => { 
        return (
            <TouchableWithoutFeedback 
                onPress={this.goToCourseDetails(item)} 
                key={index}
            >
                <View style={
                        [
                            styles.elementListBody,
                            { borderColor: index == this.state.searchList.length - 1 ? '#fff' : 'silver' }
                        ]
                    }
                >
                    <View style={styles.elementListBodyLeft}>
                        <Image
                            style={styles.elementImage}
                            source={{ uri: item.images[0] }}
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

    renderRowNews = ({ item, index }) => { 
        return (
            <TouchableWithoutFeedback 
                onPress={this.goToNewsDetails(item)} 
                key={index}
            >
                <View style={
                        [
                            styles.elementListBody,
                            { borderColor: index == this.state.searchList.length - 1 ? '#fff' : 'silver' }
                        ]
                    }
                >
                    <View style={styles.elementListBodyLeft}>
                        <Image
                            style={styles.elementImage}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.elementListBodyRight}>
                        <Text 
                            style={[styles.elementTitle, { marginBottom: 5 }]}
                            numberOfLines={1}    
                        >
                            {item.title}
                        </Text>
                        <View style={[styles.rightElement, { marginBottom: 10 }]}>                             
                            <Text
                                style={styles.elementText}
                                numberOfLines={1}
                            >
                                {item.content}
                            </Text>
                        </View>                                           
                        <View style={styles.rightElement}>
                            <Icon
                                name='timer-outline'
                                size={18}
                                color={green}
                            />
                            <Text
                                style={[styles.elementText, { marginLeft: 5 }]}
                                numberOfLines={1}
                            >
                                {moment(item.created_date).format('DD/MM/YYYY')}
                            </Text>
                        </View>
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
                        <View style={styles.headerLeft}>
                            <TouchableWithoutFeedback onPress={this.goBack}>
                                <Icon
                                    name='chevron-back'
                                    color='#fff'
                                    size={30}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headerRight}>
                            <View style={styles.searchBarWrapper}>
                                <View style={styles.searchBar}>
                                    <SearchBar
                                        placeholder={this.props.route.params.type == 'course' ? 'Tìm đơn hàng...' : 'Tìm tin tức...'}
                                        width={width - 40 - 80}
                                        setValue={this.setValue}
                                        name='searchKey'
                                        onRef={ref => (this.childSearch = ref)}
                                    />
                                </View>
                                <TouchableWithoutFeedback onPress={this.search}>
                                    <View style={styles.iconWrapper}> 
                                        <Icon
                                            name='search'
                                            color='gray'
                                            size={20}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>

                    <View style={styles.body}>
                        {!this._isMounted && !this.state.loaded ? null : 
                                this.state.searchList.length > 0 ?
                            <FlatList
                                contentContainerStyle={{ paddingBottom: 20 }}
                                ref={(ref) => { this.searchListRef = ref }}
                                data={this.state.searchList}
                                refreshing={this.state.refresh}
                                onRefresh={this.refresh}
                                renderItem={this.props.route.params.type == 'course' ? this.renderRowCourse : this.renderRowNews}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={this.state.handleLoadMore && this.props.obj.internetConnection ? this.handleLoadMore : null}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                            : 
                            <Text style={styles.noData}>Không tìm thấy kết quả</Text>
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

export default connect(mapStateToProps)(Search);
