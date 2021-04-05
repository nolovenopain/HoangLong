import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableHighlight, Alert, ScrollView, RefreshControl } from 'react-native';
import { images } from '../../../Constants';
import { navigate } from '../../../Navigators/Router';
import { styles } from './css'
import Feather from 'react-native-vector-icons/Feather';
import logout from '../../../Api/logout';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../../Action/Action';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

class MyAccount extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            refreshScreen: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goToEditProfile = () => {
        navigate('EditProfile')
    }

    goToChangePassword = () => {
        navigate('ChangePassword')
    }

    goToEducationResult = () => {
        navigate('EducationResult')
    }

    goToSupport = () => {
        navigate('Support')
    }

    goToTermAndPolicy = () => {
        navigate('TermAndPolicy')
    }

    askLogOut = () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có muốn đăng xuất?',
            [
                {text: 'Hủy', style: 'cancel'},
                {text: 'Đăng xuất', onPress: this.logOut}
            ],
            { cancelable: false }
        )
    }

    logOut = async() => {
        if(this.props.internetConnection) {
            try {
                this.props.unLoaded()
                const res = await logout(this.props.obj.userToken); 
                if(res.status == 200) {
                    this.props.loaded()
                    const resp = await res.json()
                    if(resp.code == 200) {
                        AsyncStorage
                        .clear()
                        .then(
                            () => {
                                this.props.saveUserInfo({}, null)
                                firebase.notifications().removeAllDeliveredNotifications()
                            }) 
                    }
                    else if(resp.code == 204) {
                        console.log(resp.message)
                    }
                    else if(resp.code == 205) {
                        console.log(resp.message)
                    }
                }
                else if(res.status == 500) {
                    this.props.loaded()
                    Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                }
            }
            catch(error) {
                this.props.loaded()
                console.log(error)
                Alert.alert(
                    'Sorry, something went wrong. Please try again',
                    error.message,
                    [
                        {text: 'Try Again', onPress: () => this.logOut()}
                    ]
                )
            }
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể đăng xuất')
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefreshScreen = () => {
        if(this.props.internetConnection) {
            this.setState({ refreshScreen: true });
            this.props.getUserProfile()
            this.wait(1000).then(() => this.setState({ refreshScreen: false }))
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại')
        }
    }

    render() {
        return (
            <ScrollView 
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefreshScreen} />
                }
            >
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                            
                    </View>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Tài khoản</Text>
                    </View>
                    <View style={styles.headerRight}>
                        
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.accountInfoRow}>
                        <View style={styles.left}>
                            <Image
                                style={styles.avatar}
                                source={
                                    Object.keys(this.props.obj).length > 0 && this.props.obj.info.avatar != '' ? 
                                        {uri: this.props.obj.info.avatar} : images.noAvatar
                                }
                            />
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.name}>
                                {this.props.obj.info ? this.props.obj.info.name : ''}
                            </Text>
                            <Text style={styles.email}>
                                {this.props.obj.info ? this.props.obj.info.email : ''}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableWithoutFeedback onPress={this.goToEditProfile}>
                                <Text style={styles.edit}>Sửa</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>    

                    <TouchableWithoutFeedback onPress={this.goToChangePassword}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <View style={styles.circle}>
                                    <Feather
                                        name='edit-3'
                                        size={28}
                                        color='#fff'
                                    />
                                </View>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.rowText}>Đổi mật khẩu</Text>
                            </View>
                            <View style={styles.right}>
                                <Feather
                                    name='chevron-right'
                                    size={30}
                                    color='gray'
                                />
                            </View>
                        </View>    
                    </TouchableWithoutFeedback>

                    {/* <TouchableWithoutFeedback onPress={this.goToEducationResult}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <View style={styles.circle}>
                                    <Feather
                                        name='zoom-in'
                                        size={28}
                                        color='#fff'
                                    />
                                </View>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.rowText}>Tra cứu điểm thi</Text>
                            </View>
                            <View style={styles.right}>
                                <Feather
                                    name='chevron-right'
                                    size={30}
                                    color='gray'
                                />
                            </View>
                        </View>    
                    </TouchableWithoutFeedback> */}

                    {/* <TouchableWithoutFeedback onPress={this.goToSupport}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <View style={styles.circle}>
                                    <Feather
                                        name='settings'
                                        size={28}
                                        color='#fff'
                                    />
                                </View>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.rowText}>Hỗ trợ</Text>
                            </View>
                            <View style={styles.right}>
                                <Feather
                                    name='chevron-right'
                                    size={30}
                                    color='gray'
                                />
                            </View>
                        </View>    
                    </TouchableWithoutFeedback> */}

                    <TouchableWithoutFeedback onPress={this.goToTermAndPolicy}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <View style={styles.circle}>
                                    <Feather
                                        name='alert-circle'
                                        size={28}
                                        color='#fff'
                                    />
                                </View>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.rowText}>Điều khoản và dịch vụ</Text>
                            </View>
                            <View style={styles.right}>
                                <Feather
                                    name='chevron-right'
                                    size={30}
                                    color='gray'
                                />
                            </View>
                        </View>    
                    </TouchableWithoutFeedback>

                    <TouchableHighlight
                        underlayColor='silver'
                        onPress={this.askLogOut}
                        style={styles.btn}
                    >
                        <Text style={styles.btnTitle}>Đăng xuất</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { obj } = state
    return { obj }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUserInfo,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
