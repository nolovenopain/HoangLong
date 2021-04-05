import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, ScrollView, Alert,TouchableWithoutFeedback } from 'react-native';
import { images } from '../../Constants';
import { styles } from './css';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { loading } from '../../Helpers/Functions';
import { goBack } from '../../Navigators/Router';
import register from '../../Api/register';
import { checkPhoneValidate, checkEmailValidate } from '../../Helpers/RegularExpression';
import { connect } from 'react-redux';

class Register extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            name: '',
            phone: '',
            address: '',
            code_mode: '',
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

    register = async() => {
        if(this.props.obj.internetConnection) {
            if(this.state.name == '') {
                Alert.alert('Thông báo', 'Không được để trống họ tên')
            }
            else if(this.state.phone == '') {
                Alert.alert('Thông báo', 'Không được để trống số điện thoại để liên lạc')
            }
            else if(!checkPhoneValidate(this.state.phone)) {
                Alert.alert('Thông báo', 'Sai định dạng số điện thoại')
            }
            else if(this.state.address == '') {
                Alert.alert('Thông báo', 'Không được để trống địa chỉ liên lạc')
            }
            else if(this.state.email == '') {
                Alert.alert('Thông báo', 'Không được để trống email để liên lạc và nhận thông báo')
            }
            else if(!checkEmailValidate(this.state.email)) {
                Alert.alert('Thông báo', 'Sai định dạng email')
            }
            else {
                try {
                    this.setState({ loaded: false })
                    const res = await register(
                        this.state.name,
                        this.state.phone,
                        this.state.address,
                        this.state.code_mode,
                        this.state.email,
                        ''
                    );
                    console.log(res)
                    if(res.status == 200) {
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        console.log(resp)
                        if(resp.code == 200) {
                            this.clearForm()
                            Alert.alert('Thành công', 'Ứng tuyển thành công, cán bộ tuyển dụng sẽ liên hệ lại cho bạn. Hottline tư vấn miễn phí: 0962241616')
                            this.goBack()
                        }
                        else if(resp.code == 202) {
                            Alert.alert('Thông báo', 'Số điện thoại đã tồn tại')
                        }
                        else if(resp.code == 223) {
                            Alert.alert('Thông báo', 'Email đã tồn tại')
                        }
                        else if(resp.code == 225) {
                            console.log(resp.message)
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
                            {text: 'Try Again', onPress: () => this.register()}
                        ]
                    )
                }
            }
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể đăng ký')
        }
    }

    clearForm = () => {
        this.childName.clearOldInput()
        this.childPhone.clearOldInput()
        this.childAddress.clearOldInput()
        this.childReferenceCode.clearOldInput()
        this.childEmail.clearOldInput()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {!this.state.loaded ? loading() : null}
                <View style={styles.container}>
                    <ScrollView 
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                    >
                        <Image
                            style={styles.logo}
                            source={images.logo2}
                            resizeMode='contain'
                        />  
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>ĐĂNG KÝ NGAY</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Họ và tên</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Nhập họ và tên'
                                    name='name'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width - 60 - 40}
                                    btnGroupWidth={30}
                                    length={40}
                                    marginLeft={10}
                                    nextInput={this.childPhone}
                                    onRef={ref => (this.childName = ref)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Số điện thoại</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Nhập số điện thoại'
                                    name='phone'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width - 60 - 40}
                                    btnGroupWidth={30}
                                    length={40}
                                    marginLeft={10}
                                    keyboardType='phone-pad'
                                    nextInput={this.childAddress}
                                    onRef={ref => (this.childPhone = ref)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Địa chỉ</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Địa chỉ'
                                    name='address'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width - 60 - 40}
                                    btnGroupWidth={30}
                                    length={40}
                                    marginLeft={10}
                                    nextInput={this.childReferenceCode}
                                    onRef={ref => (this.childAddress = ref)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputTitle}>Mã giới thiệu (nếu có)</Text>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Mã giới thiệu'
                                    name='code_mode'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width - 60 - 40}
                                    btnGroupWidth={30}
                                    length={40}
                                    marginLeft={10}
                                    nextInput={this.childEmail}
                                    onRef={ref => (this.childReferenceCode = ref)}
                                />
                            </View>
                        </View>

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
                                    onRef={ref => (this.childEmail = ref)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.register}
                        >
                            <Text style={styles.btnTitle}>Đăng ký</Text>
                        </TouchableOpacity>
                        
                        <TouchableWithoutFeedback onPress={this.goBack}>
                            <View style={styles.backWrapper}>
                                <Text style={styles.back}>Quay lại ?</Text>
                            </View>
                        </TouchableWithoutFeedback>
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

export default connect(mapStateToProps)(Register);
