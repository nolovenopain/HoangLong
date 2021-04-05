import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, TouchableWithoutFeedback, Alert, ToastAndroid, ScrollView } from 'react-native';
import { images } from '../../Constants';
import { styles } from './css';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { loading } from '../../Helpers/Functions';
import { goBack, navigate } from '../../Navigators/Router';
import login from '../../Api/login';
import { saveUserInfo } from '../../Action/Action';
import { bindActionCreators } from 'redux';
import sendDeviceToken from '../../Api/sendDeviceToken';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

class LogIn extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            student_code: '',
            password: ''
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded) {
            return true
        }
        return false
    }

    goBack = () => {
        goBack()
    }

    logIn = async() => {
        if(this.props.obj.internetConnection) {
            if(this.state.student_code == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập tài khoản')
            }
            else if(this.state.password == '') {
                Alert.alert('Thông báo', 'Mật khẩu không được để trống')
            }
            else {
                try {
                    this.setState({ loaded: false })
                    const res = await login(this.state.student_code, this.state.password);
                    if(res.status == 200) {
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        if(resp.code == 200) {
                            this.props.saveUserInfo(resp.data, resp.data.token)
                            AsyncStorage.setItem('userToken', resp.data.token)
                            this.getFcmToken(resp.data.token)
                            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT)
                            this.goBack()
                        }
                        else if(resp.code == 222) {
                            Alert.alert('Thông báo', 'Sai mật khẩu')
                        }
                        else if(resp.code == 223) {
                            Alert.alert('Thông báo', 'Mã học viên không tồn tại')
                        }
                    }
                    else if(res.status == 500) {
                        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT)
                        this.setState({ loaded: true })
                        Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                    }
                }
                catch(error) {
                    console.log(error)
                    this.setState({ loaded: true })
                    ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT)
                    Alert.alert(
                        'Sorry, something went wrong. Please try again',
                        error.message,
                        [
                            {text: 'Try Again', onPress: () => this.logIn()}
                        ]
                    )
                }
            }
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể đăng nhập')
        }
    }

    getFcmToken = async(userToken) => {
		let fcmToken = await AsyncStorage.getItem('fcmToken');
        if(!fcmToken) { 
            fcmToken = await firebase.messaging().getToken(); 
            if(fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
		this.sendDeviceToken(fcmToken, userToken);
	}

    sendDeviceToken = async(fcmToken, userToken) => {
        try {
            const res = await sendDeviceToken(fcmToken, userToken);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    console.log(resp.message)
                }
                else if(resp.code == 222) {
                    console.log(resp.message)
                }
                else if(resp.code == 204) {
                    console.log(resp.message)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.logIn()}
                ]
            )
        }
    }

    goToForgotPassword = () => {
        navigate('ForgotPassword')
    }

    render() { 
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {!this.state.loaded ? loading() : null}
                <ScrollView 
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <Image
                            style={styles.logo}
                            source={images.logo2}
                            resizeMode='contain'
                        />  
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Mã học viên hoặc SĐT</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Nhập mã học viên / SĐT'
                                    name='student_code'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width - 60 - 40}
                                    btnGroupWidth={30}
                                    length={40}
                                    marginLeft={10}
                                    nextInput={this.childPassword}
                                    onRef={ref => (this.childStudentCode = ref)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Mật khẩu</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Nhập mật khẩu'
                                    name='password'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={true}
                                    hideshowIcon={true}
                                    width={width - 60 - 80}
                                    btnGroupWidth={70}
                                    length={30}
                                    marginLeft={10}
                                    marginRight={5}
                                    onRef={ref => (this.childPassword = ref)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.logIn}
                        >
                            <Text style={styles.btnTitle}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <TouchableWithoutFeedback onPress={this.goToForgotPassword}>
                            <View style={styles.footer}>
                                <Text style={styles.footerTitle}>Quên mật khẩu ?</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={this.goBack}>
                            <View style={styles.footer}>
                                <Text style={styles.footerTitle}>Quay lại ?</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { obj } = state
    return { obj }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUserInfo       
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
