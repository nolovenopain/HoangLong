import React, { Component } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableWithoutFeedback, TouchableHighlight, Alert } from 'react-native';
import { styles } from './css'
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import { loading } from '../../Helpers/Functions';
import changePassword from '../../Api/changePassword';
import { connect } from 'react-redux';

class ChangePassword extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            current_password: '',
            password: '',
            confirm_password: '',
            loaded: true
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded) {
            return true
        }
        return false
    }
    
    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    goBack = () => {
        goBack()
    }

    changePassword = async() => {
        if(this.props.obj.internetConnection) {
            if(this.state.current_password == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu hiện tại')
            }
            else if(this.state.password == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu mới')
            }
            else if(this.state.confirm_password == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu xác nhận')
            }
            else if(this.state.confirm_password != this.state.password) {
                Alert.alert('Thông báo', 'Mật khẩu xác nhận không trùng khớp')
            }
            else {
                try {
                    this.setState({ loaded: false })
                    const res = await changePassword(this.props.obj.userToken, this.state.current_password, this.state.password);
                    if(res.status == 200) { 
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        console.log(resp)
                        if(resp.code == 200) {
                            Alert.alert('Thông báo', 'Đổi mật khẩu thành công')
                            this.goBack()
                        }
                        else if(resp.code == 225) {
                            Alert.alert('Thông báo', 'Mật khẩu hiện tại không đúng')
                        }
                        else if(resp.code == 234) {
                            Alert.alert('Thông báo', 'Mật khẩu mới trùng với mật khẩu hiện tại')
                        }
                    }
                    else if(res.status == 500) {
                        this.setState({ loaded: true })
                        Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                    }
                }
                catch(error) {
                    console.log(error)
                    this.setState({ loaded: true })
                    Alert.alert(
                        'Sorry, something went wrong. Please try again',
                        error.message,
                        [
                            {text: 'Try Again', onPress: () => this.changePassword()}
                        ]
                    )
                }
            }
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể đổi mật khẩu')
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
                            <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}
                    > 
                       <View style={styles.content}>
                            <Text style={styles.title}>
                                Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn rồi ấn hoàn thành để thay đổi mật khẩu .
                            </Text>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputTitle}>Mật khẩu hiện tại</Text>
                                <View style={styles.input}>
                                    <Input
                                        placeholder='Nhập mật khẩu hiện tại'
                                        name='current_password'
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
                                        nextInput={this.childPassword}
                                        onRef={ref => (this.childCurrentPassword = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputTitle}>Mật khẩu mới</Text>
                                <View style={styles.input}>
                                    <Input
                                        placeholder='Nhập mật khẩu mới'
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
                                        nextInput={this.childConfirmPassword}
                                        onRef={ref => (this.childPassword = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputTitle}>Xác nhận lại mật khẩu</Text>
                                <View style={styles.input}>
                                    <Input
                                        placeholder='Xác nhận mật khẩu mới'
                                        name='confirm_password'
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
                                        onRef={ref => (this.childConfirmPassword = ref)}
                                    />
                                </View>
                            </View>

                            <TouchableHighlight 
                                onPress={this.changePassword}
                                style={styles.btn}
                                underlayColor='silver'
                            >
                                <Text style={styles.btnTitle}>Hoàn thành</Text>
                            </TouchableHighlight>
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

export default connect(mapStateToProps)(ChangePassword);
