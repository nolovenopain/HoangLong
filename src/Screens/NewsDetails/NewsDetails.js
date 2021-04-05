import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableWithoutFeedback, ScrollView, Image, FlatList, Alert, RefreshControl } from 'react-native';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import HTML from "react-native-render-html";
import { width, height } from '../../Components/Dimensions/Dimensions';
import getNewsDetails from '../../Api/getNewsDetails';
import { loading } from '../../Helpers/Functions';
import { connect } from 'react-redux';
import { images } from '../../Constants';

const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, width - 30);
};

class NewsDetails extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            listRelated: [],
            news: {},
            loaded: false,
            refreshScreen: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                this.getNewsDetails(this.props.route.params.newsId)
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded &&
                this.state.listRelated != nextState.listRelated &&
                this.state.news != nextState.news) {
            return true
        }
        return false
    }

    async componentDidUpdate(prevProps) {
        if((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) { 
            this.componentDidMount()
        }
    }

    getNewsDetails = async(newsId) => {
        try {
            this.setState({ 
                loaded: false,
                listRelated: [],
                news: {} 
            })
            var news = {}
            const res = await getNewsDetails(newsId);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    news = resp.data
                    console.log(news)
                    if(Object.keys(news).length > 0) {
                        this.setState({ 
                            listRelated: news.dataNewsRelated,
                            loaded: true,
                            news: news.detailNews
                        })
                    }
                    else {
                        this.setState({ loaded: true})
                        Alert.alert('Thông báo', 'Không có dữ liệu tin tức')
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
                    {text: 'Try Again', onPress: () => this.getNewsDetails(newsId)}
                ]
            )
        }
    }
    
    goBack = () => {
        goBack()
    }

    goToOtherNews = news => e => { 
        this.props.navigation.push('NewsDetails', { newsId: news.id })
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefreshScreen = () => {
        if(this.props.obj.internetConnection) {
            this.getNewsDetails(this.state.news.id)
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại tin tức')
        }
    }

    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToOtherNews(item)}>
                <View style={
                        [
                            styles.element,
                            { marginLeft: index > 0 ? 15 : 0 }
                        ]
                    }
                >
                    <Image
                        style={styles.elementImage}
                        source={item.image && item.image != '' ? { uri: item.image } : images.noImage}
                    />
                    <Text
                        style={styles.elementTitle}
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>
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
                            <Text style={styles.headerTitle}>
                                {this.state.news.category_name}
                            </Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefreshScreen} />
                        }
                    > 
                       <View style={styles.content}>
                            <Text style={styles.contentTitle}>
                                {this.state.news.title}
                            </Text>


                            <HTML 
                                source={{ html: this.state.news.content ? this.state.news.content : '<p></p>' }} 
                                contentWidth={width} 
                                tagsStyles={tagsStyles}
                                computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
                            /> 

                            {this.state.loaded ? 
                                <Text style={styles.contentTitle}>Bài viết liên quan</Text> : null
                            }
                            
                            <FlatList
                                contentContainerStyle={{ paddingTop: 15 }}
                                data={this.state.listRelated}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            />
                       </View>
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

export default connect(mapStateToProps)(NewsDetails);

const tagsStyles = {
    h1: { 
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 10,
    },
    h2: { 
        fontSize: 14.5,
        lineHeight: 20,
        marginBottom: 10,
    },
    h3: { 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    h4: { 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    h5: { 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    h6: { 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    p: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    span: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    b: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
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
