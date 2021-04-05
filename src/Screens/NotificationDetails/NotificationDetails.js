import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableWithoutFeedback, ScrollView, Alert, RefreshControl} from 'react-native';
import { styles } from './css'
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import HTML from "react-native-render-html";
import { width, height } from '../../Components/Dimensions/Dimensions';
import getNotiDetails from '../../Api/getNotiDetails';
import { connect } from 'react-redux';
import { loading } from '../../Helpers/Functions';

const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, width - 30);
};

class NotificationDetails extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            noti: {},
            loaded: false,
            refreshScreen: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            if(this._isMounted && this.props.obj.internetConnection) {
                this.getNotiDetails(this.props.route.params.notificationId)
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded &&
                this.state.noti != nextState.noti) {
            return true
        }
        return false
    }

    async componentDidUpdate(prevProps) {
        if((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) { 
            this.componentDidMount()
        }
    }

    getNotiDetails = async(notificationId) => {
        try {
            this.setState({ 
                loaded: false,
                noti: {} 
            })
            var noti = {}
            const res = await getNotiDetails(notificationId);
            if(res.status == 200) {
                const resp = await res.json(); 
                if(resp.code == 200) {
                    noti = resp.data
                    if(Object.keys(noti).length > 0) {
                        this.setState({ 
                            loaded: true,
                            noti
                        })
                    }
                    else {
                        this.setState({ loaded: true})
                        Alert.alert('Thông báo', 'Không có dữ liệu thông báo')
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
                    {text: 'Try Again', onPress: () => this.getNotiDetails(notificationId)}
                ]
            )
        }
    }
    
    goBack = () => {
        goBack()
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefreshScreen = () => {
        if(this.props.obj.internetConnection) {
            this.getNotiDetails(this.state.noti.id)
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại tin tức')
        }
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
                            <Text style={styles.headerTitle}>Chi tiết thông báo</Text>
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
                                {this.state.noti.title}
                            </Text>
                            <HTML 
                                source={{ html: this.state.noti.message ? this.state.noti.message : '<p></p>' }} 
                                contentWidth={width} 
                                tagsStyles={tagsStyles}
                                computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
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

export default connect(mapStateToProps)(NotificationDetails);

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
