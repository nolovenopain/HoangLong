import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, TouchableWithoutFeedback, Alert, ToastAndroid } from 'react-native';
import { images } from '../../Constants';
import { styles } from './css';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { loading } from '../../Helpers/Functions';
import { goBack } from '../../Navigators/Router';
import { checkEmailValidate } from '../../Helpers/RegularExpression';
import forgotPassword from '../../Api/forgotPassword';
import { connect } from 'react-redux';

class ForgotPassword extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            email: ''
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

    sendEmail = async() => {
        if(this.props.obj.internetConnection) {
            if(this.state.email == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập email để lấy lại mật khẩu')
            }
            else if(!checkEmailValidate(this.state.email)) {
                Alert.alert('Thông báo', 'Email không đúng định dạng')
            }
            else {
                try {
                    this.setState({ loaded: false })
                    const res = await forgotPassword(this.state.email);
                    if(res.status == 200) { 
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        if(resp.code == 200) {
                            ToastAndroid.show('Gửi email thành công', ToastAndroid.SHORT)
                            Alert.alert(
                                'Thông báo', 
                                resp.message + '. Bạn có muốn quay lại trang đăng nhập không ?',
                                [
                                    {text: 'Hủy', style: 'cancel'},
                                    {text: 'OK', onPress: () => this.goBack()}
                                ]
                            )
                        }
                        else if(resp.code == 223) {
                            Alert.alert('Thông báo', 'Email không tồn tại')
                        }
                        else if(resp.code == 204) {
                            console.log(resp.message)
                        }
                    }
                    else if(res.status == 500) {
                        this.setState({ loaded: true })
                        ToastAndroid.show('Gửi email thất bại', ToastAndroid.SHORT)
                        Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                    }
                }
                catch(error) {
                    console.log(error)
                    this.setState({ loaded: true })
                    ToastAndroid.show('Gửi email thất bại', ToastAndroid.SHORT)
                    Alert.alert(
                        'Sorry, something went wrong. Please try again',
                        error.message,
                        [
                            {text: 'Try Again', onPress: () => this.sendEmail()}
                        ]
                    )
                }
            }
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể gửi email')
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {!this.state.loaded ? loading() : null}
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Image
                            style={styles.logo}
                            source={images.logo2}
                            resizeMode='contain'
                        />  
                        <Text style={styles.note}>Vui lòng nhập email đã đăng ký để lấy lại mật khẩu !</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Email</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Nhập email'
                                    name='email'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width - 60 - 40}
                                    btnGroupWidth={30}
                                    length={40}
                                    marginLeft={10}
                                    keyboardType='email-address'
                                    onRef={ref => (this.childEmail = ref)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.sendEmail}
                        >
                            <Text style={styles.btnTitle}>Gửi email</Text>
                        </TouchableOpacity>
                        
                        <TouchableWithoutFeedback onPress={this.goBack}>
                            <View style={styles.footer}>
                                <Text style={styles.footerTitle}>Quay lại đăng nhập ?</Text>
                            </View>
                        </TouchableWithoutFeedback>
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

export default connect(mapStateToProps)(ForgotPassword);