import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, Image, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native';
import { green } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import { loading } from '../../Helpers/Functions';
import getNewsList from '../../Api/getNewsList';
import moment from 'moment';
import getCategoryList from '../../Api/getCategoryList';
import { connect } from 'react-redux';
import { images } from '../../Constants';

class News extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            newsList: [],
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
            page: 1,
            tabNews: [],
            categoryId: '',
            categoryName: '',
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                const categoryList = await this.getCategoryList()
                var tabNews = []
                if(categoryList.length > 0) {
                    categoryList.map((value, key) => {
                        tabNews.push(
                            {
                                id: value.id,
                                name: value.name,
                                active: key == 0 ? true : false
                            }
                        )
                    })
                    const data = await this.getNewsList(categoryList[0].id)
                    if(data.dataNews.length < 10) {
                        this.setState({ 
                            handleLoadMore: false, 
                            itemLoading: false,
                            loaded: true, 
                            newsList: data.dataNews,
                            tabNews,
                            categoryId: categoryList[0].id,
                            categoryName: categoryList[0].name
                        })
                    } 
                    else {
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            loaded: true,
                            newsList: data.dataNews,
                            tabNews,
                            categoryId: categoryList[0].id,
                            categoryName: categoryList[0].name
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
            this.state.newsList != nextState.newsList ||
            this.state.refresh != nextState.refresh ||
            this.props.obj.internetConnection != nextProps.obj.internetConnection ||
            this.props.obj.notiTypeNewsCount != nextProps.obj.notiTypeNewsCount) {
                return true
        }
        return false
    }

    componentDidUpdate(prevProps) {
        if( ((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) ||
                prevProps.obj.notiTypeNewsCount != this.props.obj.notiTypeNewsCount) { 
            this.setState({ 
                page: 1,
                loaded: false,
                newsList: [], 
                categoryId: ''
            }, async() => {
                const categoryList = await this.getCategoryList()
                var tabNews = []
                if(categoryList.length > 0) {
                    categoryList.map((value, key) => {
                        tabNews.push(
                            {
                                id: value.id,
                                name: value.name,
                                active: key == 0 ? true : false
                            }
                        )
                    })
                    const data = await this.getNewsList(categoryList[0].id)
                    if(data.dataNews.length < 10) {
                        this.setState({ 
                            handleLoadMore: false, 
                            itemLoading: false,
                            loaded: true, 
                            newsList: data.dataNews,
                            tabNews,
                            categoryId: categoryList[0].id,
                            categoryName: categoryList[0].name
                        })
                    } 
                    else {
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            loaded: true,
                            newsList: data.dataNews,
                            tabNews,
                            categoryId: categoryList[0].id,
                            categoryName: categoryList[0].name
                        })
                    }
                }
            })
        }
    }

    getCategoryList = async() => {
        try {
            var data = []
            const res = await getCategoryList('news');
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

    getNewsList = async(categoryId) => {
        try {
            var data = {}
            const res = await getNewsList(categoryId, this.state.page);
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
                    {text: 'Try Again', onPress: () => this.getNewsList(categoryId)}
                ]
            )
        }
    }

    chooseTabNews = item => e => {
        this.setState({ loaded: false })
        var tabNews = [];
        this.state.tabNews.map((value, key) => {
            if(item.id == value.id) {
                value.active = true
            }
            else {
                value.active = false
            }
            tabNews.push(value)
        });
        this.setState({ 
            tabNews,
            page: 1,
            categoryId: item.id,
            categoryName: item.name
        }, async() => {
            if(this.props.obj.internetConnection) {
                const data = await this.getNewsList(this.state.categoryId)
                if(data.dataNews.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        loaded: true, 
                        newsList: data.dataNews,
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        loaded: true,
                        newsList: data.dataNews,
                    })
                }
            }
            else {
                Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải danh sách tin tức')
            }
        })
    }

    goToNewsDetails = news => e => {
        navigate('NewsDetails', { newsId: news.id })
    }

    goBack = () => {
        goBack()
    }

    goToSearch = () => {
        navigate('Search', { type: 'news' })
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
                const data = await this.getNewsList(this.state.categoryId)
                if(data.dataNews.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        newsList: [...this.state.newsList,...data.dataNews],
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        newsList: [...this.state.newsList,...data.dataNews],
                    })
                }
            });       
    }

    refresh = () => {
        this.setState({ 
            page: 1,
            refresh: true,
            newsList: [],
            categoryId: ''
        },  async() => {
                if(this.props.obj.internetConnection) {
                    const categoryList = await this.getCategoryList()
                    var tabNews = []
                    if(categoryList.length > 0) {
                        categoryList.map((value, key) => {
                            tabNews.push(
                                {
                                    id: value.id,
                                    name: value.name,
                                    active: key == 0 ? true : false
                                }
                            )
                        })
                        var data = await this.getNewsList(categoryList[0].id)
                        if(data.dataNews.length < 10) {
                            this.setState({ 
                                handleLoadMore: false, 
                                itemLoading: false, 
                                newsList: data.dataNews,
                                tabNews,
                                categoryId: categoryList[0].id, 
                                refresh: false
                            })
                        } 
                        else {
                            this.setState({
                                itemLoading: true,
                                handleLoadMore: true,
                                newsList: data.dataNews,
                                tabNews,
                                categoryId: categoryList[0].id,
                                refresh: false
                            })
                        }
                    }
                }
                else {
                    Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại dánh sách tin tức')
                }
            }
        );
    }

    scrollToTop = () => {
        if(this.state.newsList.length > 0) {
            this.newsListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }
    
    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback 
                onPress={this.goToNewsDetails(item)} 
                key={index}
            >
                <View style={
                        [
                            styles.elementListBody,
                            { borderColor: index == this.state.newsList.length - 1 ? '#fff' : 'silver' }
                        ]
                    }
                >
                    <View style={styles.elementListBodyLeft}>
                        <Image
                            style={styles.elementImage}
                            source={item.image && item.image != '' ? { uri: item.image } : images.noImage}
                        />
                    </View>
                    <View style={styles.elementListBodyRight}>
                        <Text 
                            style={styles.elementTitle}
                            numberOfLines={2}    
                        >
                            {item.title}
                        </Text>                                     
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
                            <Text style={styles.headerTitle}>Tin tức</Text>
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
                        {this.state.tabNews.length > 0 ?
                            <FlatList
                                data={this.state.tabNews}
                                renderItem={this.renderRowTabNews}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            /> : null
                        }
                    </View>

                    <View style={styles.body}>
                        {!this._isMounted && !this.state.loaded ? null : 
                            this.state.newsList.length > 0 ?
                                <FlatList
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    ref={(ref) => { this.newsListRef = ref }}
                                    data={this.state.newsList}
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

export default connect(mapStateToProps)(News);
