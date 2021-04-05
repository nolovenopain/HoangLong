import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, Image, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import getNotiList from '../../Api/getNotiList';
import { images } from '../../Constants';
import { fetchUserToken } from '../../Helpers/Functions';
import { navigate } from '../../Navigators/Router';
import { styles } from './css';
import { connect } from 'react-redux';
import moment from 'moment'

class Notifications extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            notiList: [],
            loaded: false,
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
            token: null
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                const token = await fetchUserToken()
                const notiList = await this.getNotiList(token ? token : '')
                if(notiList.length < 10) {
                    this.setState({ 
                        notiList,
                        loaded: true,
                        handleLoadMore: false, 
                        itemLoading: false,
                        token  
                    })
                } 
                else {
                    this.setState({
                        notiList,
                        loaded: true,
                        handleLoadMore: true, 
                        itemLoading: true,
                        token  
                    })
                }          
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if( this.state.loaded != nextState.loaded || 
            this.state.handleLoadMore != nextState.handleLoadMore ||
            this.state.refresh != nextState.refresh || 
            this.state.notiList != nextState.notiList ||
            this.props.obj.userToken != nextProps.obj.userToken ||
            this.props.obj.internetConnection != nextProps.obj.internetConnection ||
            this.props.obj.notiCount != nextProps.obj.notiCount) {
                return true
            }
        return false
    }

    componentDidUpdate(prevProps) {
        if( ((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) ||
                prevProps.obj.notiCount != this.props.obj.notiCount || prevProps.obj.userToken != this.props.obj.userToken) { 
            this.setState({ 
                page: 1,
                loaded: false
            }, async() => {
                const notiList = await this.getNotiList(this.props.obj.userToken ? this.props.obj.userToken : '')
                if(notiList.length < 10) {
                    this.setState({ 
                        notiList,
                        handleLoadMore: false, 
                        itemLoading: false,
                        loaded: true
                    })
                } 
                else {
                    this.setState({
                        notiList,
                        handleLoadMore: true, 
                        itemLoading: true, 
                        loaded: true 
                    })
                }    
            })  
        }
    }

    goToNotificationDetails = noti => e => {
        switch(noti.type) {
            case 'course': 
                navigate('CourseDetails', { courseId: noti.object_id })
                break
            case 'news': 
                navigate('NewsDetails', { newsId: noti.object_id })
                break
            case 'normal':
                navigate('NotificationDetails', { notificationId: noti.id })
                break
            case 'result':
                navigate('EducationProcess')
                break
            default: 
                Alert.alert('Lỗi', 'Không tìm thấy thông báo')
        }
    }

    getNotiList = async(token) => { 
        try {
            const res = await getNotiList(this.state.page, token); console.log(res)
            var notiList = []
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    notiList = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp.message)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return notiList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getNotiList(token)}
                ]
            )
        }
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
                const notiList = await this.getNotiList(this.state.token ? this.state.token: '')
                if(notiList.length < 10) {
                    this.setState({ 
                        notiList: [...this.state.notiList,...notiList],
                        handleLoadMore: false, 
                        itemLoading: false  
                    })
                } 
                else {
                    this.setState({
                        notiList: [...this.state.notiList,...notiList],
                        handleLoadMore: true, 
                        itemLoading: true  
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
                    const notiList = await this.getNotiList(this.state.token ? this.state.token: '')
                    if(notiList.length < 10) {
                        this.setState({ 
                            notiList,
                            handleLoadMore: false, 
                            itemLoading: false,
                            refresh: false  
                        })
                    } 
                    else {
                        this.setState({
                            notiList,
                            handleLoadMore: true, 
                            itemLoading: true,
                            refresh: false  
                        })
                    }  
                }
                else {
                    this.setState({ refresh: false })
                    Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại dánh sách thông báo')
                }         
            }
        );
    }

    scrollToTop = () => {
        if(this.state.notiList.length > 0) {
            this.notiListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }
    
    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToNotificationDetails(item)}>
                <View style={styles.rowWrapper}>
                    <View style={
                            [
                                styles.row,
                                { borderBottomWidth: index < this.state.notiList.length - 1 ? 0.5 : 0 }
                            ]
                        }
                    >
                        <View style={styles.rowLeft}>
                            <Image
                                style={styles.image}
                                source={item.image && item.image != '' ? { uri: item.image} : images.noImage}
                            />
                        </View>
                        <View style={styles.rowRight}>
                            <Text 
                                style={styles.rowTitle}
                                numberOfLines={2}
                            >
                                {item.title}
                            </Text>
                            <Text style={styles.timeDate}>
                                {moment(item.created_at).format('DD/MM/YYYY') + ', lúc ' + moment(item.created_at).format('HH:mm')}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() { console.log(this.state.notiList)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Thông báo</Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <View style={styles.body}>
                        {!this._isMounted && !this.state.loaded ? null : 
                            this.state.notiList.length > 0 ?
                                <FlatList
                                    ref={(ref) => { this.notiListRef = ref }}
                                    data={this.state.notiList}
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

export default connect(mapStateToProps)(Notifications);
