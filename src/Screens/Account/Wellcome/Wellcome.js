import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { images } from '../../../Constants';
import { navigate } from '../../../Navigators/Router';
import { styles } from './css'

export default class Wellcome extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goToRegister = () => {
        navigate('Register')
    }

    goToLogIn = () => {
        navigate('LogIn', {
            checkLoggedIn: this.props.checkLoggedIn,
            getBackUserInfo: this.props.getBackUserInfo
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={images.logo2}
                    resizeMode='contain'
                />  
                <Text style={styles.wellcome}>
                    Chào mừng bạn đến với sàn việc làm để nhận thông tin tư vấn về đơn hàng hoặc tra cứu quá trình học tập vui lòng chọn đăng ký hoặc đăng nhập !
                </Text>

                <TouchableWithoutFeedback onPress={this.goToRegister}>
                    <View style={styles.btn}>
                        <Text style={styles.btnTitle}>Đăng ký</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.goToLogIn}>
                    <View style={styles.btn}>
                        <Text style={styles.btnTitle}>Đăng nhập</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
