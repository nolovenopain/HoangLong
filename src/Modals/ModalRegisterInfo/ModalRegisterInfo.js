import React, { Component } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from "./css";
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import register from '../../Api/register';
import { checkPhoneValidate, checkEmailValidate } from '../../Helpers/RegularExpression';

export default class ModalRegisterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: '',
            code_mode: '',
            email: '',
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.modalRegisterInfoVisible != nextProps.modalRegisterInfoVisible) {
            return true
        }
        return false
    }

    closeModal = () => {
        this.props.closeModalRegisterInfo()
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    clearForm = () => {
        this.childName.clearOldInput()
        this.childPhone.clearOldInput()
        this.childAddress.clearOldInput()
        this.childReferenceCode.clearOldInput()
        this.childEmail.clearOldInput()
    }

    recruitment = async() => {
        if(this.props.internetConnection) {
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
                    this.props.setUnLoadedData()
                    const res = await register(
                        this.state.name,
                        this.state.phone,
                        this.state.address,
                        this.state.code_mode,
                        this.state.email,
                        this.props.course.id
                    );
                    if(res.status == 200) {
                        this.props.setLoadedData()
                        const resp = await res.json()
                        if(resp.code == 200) {
                            this.clearForm()
                            Alert.alert('Thành công', 'Ứng tuyển thành công, cán bộ tuyển dụng sẽ liên hệ lại cho bạn. Hottline tư vấn miễn phí: 0962241616')
                            this.closeModal()
                        }
                        else if(resp.code == 202) {
                            Alert.alert('Thông báo', 'Số điện thoại đã tồn tại')
                        }
                        else if(resp.code == 223) {
                            Alert.alert('Thông báo', 'Email đã tồn tại')
                        }
                    }
                    else if(res.status == 500) {
                        this.props.setLoadedData()
                        Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                    }
                }
                catch(error) {
                    this.props.setLoadedData()
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
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể đăng ký ứng tuyển')
        }
    }

    render() {
        return (
            <Modal
                animationType='fade' 
                transparent={true}
                visible={this.props.modalRegisterInfoVisible}
                statusBarTranslucent={true}
                onRequestClose={this.closeModal}
            >
                <View style={styles.modalWrapper}>
                    <KeyboardAvoidingView 
                        style={styles.modalContent}
                        behavior='padding'
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <Text style={styles.headerTitle}>ỨNG TUYỂN NGAY</Text>
                                </View>
                                <View style={styles.headerRight}>
                                    <TouchableWithoutFeedback onPress={this.closeModal}>
                                        <Icon
                                            name='close'
                                            size={27}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        
                            <View style={styles.body}>
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
                                            nextInput={this.childAddress}
                                            keyboardType='phone-pad'
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
                                            keyboardType='email-address'
                                            onRef={ref => (this.childEmail = ref)}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={this.recruitment}
                                >
                                    <Text style={styles.btnTitle}>ỨNG TUYỂN</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        )
    }
}

