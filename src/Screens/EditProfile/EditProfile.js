import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView, Image, TouchableHighlight, Modal, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./css";
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import ModalGender from '../../Modals/ModalGender/ModalGender';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { loading } from '../../Helpers/Functions';
import { navigate } from '../../Navigators/Router';
import { checkEmailValidate, checkPhoneValidate } from '../../Helpers/RegularExpression';
import updateProfile from '../../Api/updateProfile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUserInfo } from '../../Action/Action';

class EditProfile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            modalGenderVisible: false,
            isDatePickerVisible: false,
            gender: this.props.obj.info.gender,
            birthday: this.props.obj.info.dob ? moment(this.props.obj.info.dob).toDate() : new Date(),
            birthdayShow: this.props.obj.info.dob,
            avatarSrc: this.props.obj.info.avatar,
            name: this.props.obj.info.name,
            email: this.props.obj.info.email,
            phone: this.props.obj.info.phone,
            address: this.props.obj.info.address,
            city: this.props.obj.info.province,
            country: this.props.obj.info.country,
            uploadAvatar: null,
            changeAvatar: false,
            modalImagePickerVisible: false,
            loaded: true,
            selectCityId : '',
            selectCountryId : '',
        };
    }

    async componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.modalGenderVisible != nextState.modalGenderVisible ||
            this.state.isDatePickerVisible != nextState.isDatePickerVisible ||
            this.state.gender != nextState.gender ||
            this.state.birthday != nextState.birthday ||
            this.state.avatarSrc != nextState.avatarSrc ||
            this.state.modalImagePickerVisible != nextState.modalImagePickerVisible ||
            this.state.changeAvatar != nextState.changeAvatar ||
            this.state.city != nextState.city ||
            this.state.country != nextState.country ) {
            return true
        }
        return false
    }

    goBack = () => {
        goBack()
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    changeAvatar = () => {
        this.setState({ modalImagePickerVisible: true })
    }

    closeModalImagePicker = () => {
        this.setState({ modalImagePickerVisible: false })
    }

    takePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    avatarSrc: image.path, 
                    uploadAvatar: image,
                    changeAvatar: true,
                    modalImagePickerVisible: false
                }) 
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    pickPhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            if(!image.mime) {
                Alert.alert('Lỗi !!!', 'Sai định dạng ảnh. Hãy chọn ảnh khác')
            } 
            else {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    avatarSrc: image.path, 
                    uploadAvatar: image,
                    changeAvatar: true,
                    modalImagePickerVisible: false
                }) 
            }
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    openModalGender = () => {
        this.setState({ modalGenderVisible: true })
    }

    closeModalGender = () => {
        this.setState({ modalGenderVisible: false })
    }

    chooseMale = () => {
        this.setState({ gender: 'male' })
    }

    chooseFemale = () => {
        this.setState({ gender: 'female' })
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }

    handleDateConfirm = (date) => {
        this.setState({ 
            birthday: date, 
            isDatePickerVisible: false,
            birthdayShow: date
        })
    };

    goToCityList = () => {
        navigate('ListSelection', { 
            type: 'city', 
            title: 'Tỉnh/Thành phố',
            city: this.state.city ? this.state.city : '',
            getCity: this.getCity 
        })
    }

    goToCountryList = () => {
        navigate('ListSelection', { 
            type: 'country', 
            title: 'Quốc gia',
            country: this.state.country ? this.state.country : '',
            getCountry: this.getCountry
        })
    }

    getCity = city => {
        this.setState({ 
            city: city.name,
            selectCityId: city.id 
        })
    }

    getCountry = country => {
        this.setState({ 
            country: country.country_name,
            selectCountryId: country.country_id
        })
    }

    saveAccountInfo = async() => {
        if(this.props.obj.internetConnection) {
            if(!this.state.email || this.state.email == '') {
                Alert.alert('Thông báo', 'Email không được để trống')
            }
            else if(!checkEmailValidate(this.state.email) && this.state.email) {
                Alert.alert('Thông báo', 'Sai định dạng email')
            }
            else if(!this.state.phone || this.state.phone == '') {
                Alert.alert('Thông báo', 'Số điện thoại không được để trống')
            }
            else  if(!checkPhoneValidate(this.state.phone) && this.state.phone) {
                Alert.alert('Thông báo', 'Sai định dạng số điện thoại')
            }
            else {
                this.setState({ loaded: false })
                try{
                    const res = await updateProfile(
                        this.props.obj.userToken,
                        this.state.name,
                        this.state.email,
                        this.state.gender,
                        this.state.birthdayShow ? moment(this.state.birthday).format('YYYY-MM-DD') : null,
                        this.state.phone,
                        this.state.selectCountryId,
                        this.state.selectCityId,
                        this.state.address,
                        this.state.uploadAvatar
                    )
                    if(res.status == 200) {
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        if(resp.code == 200) {        
                            this.props.saveUserInfo(resp.data, this.props.obj.userToken)
                            Alert.alert('Update successfully !!!', "Your profile is updated");
                            this.goBack()
                        }
                        else if(resp.code == 225) {
                            Alert.alert('Error !!!', resp.message);
                        }
                        else if(resp.code == 205) {
                            console.log(resp.message)
                        }
                        else if(resp.code == 202) {
                            console.log('Error: ', resp.message);
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
                            {text: 'Try Again', onPress: () => this.saveAccountInfo()}
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
                {this.state.loaded ? null : loading()}
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableWithoutFeedback onPress={this.goBack}>
                                    <Icon
                                        name='chevron-back'
                                        size={30}
                                        color='#fff'
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.headerCenter}>
                                <Text style={styles.headerTitle}>Chỉnh sửa thông tin</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}    
                        >   
                            <View style={styles.avatarWrapper}>
                                <TouchableWithoutFeedback onPress={this.changeAvatar}>
                                    <Image
                                        style={styles.avatar}
                                        source={ 
                                            this.state.avatarSrc == '' ? require('../../Assets/Images/noAvatar.png') : { uri: this.state.avatarSrc }
                                        }
                                    />
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Họ tên</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Name *'
                                        name='name'
                                        setValue={this.setValue}
                                        oldValue={this.state.name}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={18}
                                        textAlign='right'
                                        onRef={ref => (this.childName = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Email</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Email *'
                                        name='email'
                                        setValue={this.setValue}
                                        oldValue={this.state.email}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={18}
                                        textAlign='right'
                                        keyboardType='email-address'
                                        onRef={ref => (this.childEmail = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Giới tính</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={this.openModalGender}>
                                    <View 
                                        style={
                                            [
                                                styles.right,
                                                { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 7 }
                                            ]
                                        }
                                    >
                                        <Text style={styles.selectTitle}>
                                            {this.state.gender == '' ? 'Chọn giới tính' : (this.state.gender == 'male' ? 'Nam' : 'Nữ')}
                                        </Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={16}
                                            color='gray'
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Ngày tháng năm sinh</Text>
                                </View>
                                    <TouchableHighlight 
                                        underlayColor='transparent' 
                                        onPress={this.showDatePicker}
                                    >
                                    <View 
                                        style={
                                            [
                                                styles.right,
                                                { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 7 }
                                            ]
                                        }
                                    >
                                        <Text style={styles.selectTitle}>
                                            {this.state.birthdayShow ? moment(this.state.birthday).format('DD/MM/YYYY') : 'Chọn sn'}
                                        </Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={16}
                                            color='gray'
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>

                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleDateConfirm}
                                onCancel={this.hideDatePicker}
                                date={this.state.birthday}
                                maximumDate={new Date()}
                            />

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Số điện thoại</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Phone number'
                                        name='phone'
                                        setValue={this.setValue}
                                        oldValue={this.state.phone}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={18}
                                        textAlign='right'
                                        keyboardType='phone-pad'
                                        onRef={ref => (this.childPhone = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Quốc tịch</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={this.goToCountryList}>
                                    <View 
                                        style={
                                            [
                                                styles.right,
                                                { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 7 }
                                            ]
                                        }
                                    >
                                        <Text style={styles.selectTitle}>
                                            {!this.state.country || this.state.country == '' ? 'Chọn quốc tịch' : this.state.country}
                                        </Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={16}
                                            color='gray'
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Tỉnh/Thành phố</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={this.goToCityList}>
                                    <View 
                                        style={
                                            [
                                                styles.right,
                                                { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 7 }
                                            ]
                                        }
                                    >
                                        <Text style={styles.selectTitle}>
                                            {!this.state.city || this.state.city == '' ? 'Chọn thành phố' : this.state.city}
                                        </Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={16}
                                            color='gray'
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Địa chỉ</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Địa chỉ'
                                        name='address'
                                        setValue={this.setValue}
                                        oldValue={this.state.address}
                                        editable={true}
                                        multiline={true}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={18}
                                        textAlign='right'
                                        onRef={ref => (this.childAddress = ref)}
                                    />
                                </View>
                            </View>
                            
                            <TouchableHighlight 
                                onPress={this.saveAccountInfo}
                                style={styles.btn}
                                underlayColor='silver'
                            >
                                <Text style={styles.btnTitle}>Hoàn thành</Text>
                            </TouchableHighlight>
                        </ScrollView>

                        {/* MODAL GENDER */}
                            <ModalGender
                                modalGenderVisible={this.state.modalGenderVisible}
                                closeModalGender={this.closeModalGender}
                                chooseFemale={this.chooseFemale}
                                chooseMale={this.chooseMale}
                                gender={this.state.gender}
                            />
                        {/* MODAL GENDER */}

                        {/* MODAL IMAGE PICKER */}
                            <Modal
                                visible={this.state.modalImagePickerVisible}
                                transparent={true}
                                animationType='fade'
                                statusBarTranslucent={true}
                            >   
                                <TouchableWithoutFeedback onPress={this.closeModalImagePicker}>
                                    <View style={styles.modalBackground}>
                                        <TouchableWithoutFeedback onPress={() => {}}>
                                            <View style={styles.modalPicker}>
                                                <View style={styles.imgPicker}>
                                                    <TouchableOpacity 
                                                        style={styles.takePhoto}
                                                        onPress={this.takePhoto}
                                                    >
                                                        <Text style={styles.modalImageText}>Chụp ảnh</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.underlinePicker}></View>
                                                    <TouchableOpacity 
                                                        style={styles.libraryPhoto}
                                                        onPress={this.pickPhotoFromLibrary}
                                                    >
                                                            <Text style={styles.modalImageText}>Chọn ảnh có sẵn</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity 
                                                    style={styles.cancel}
                                                    onPress={this.closeModalImagePicker}
                                                >
                                                    <Text style={styles.modalImageText}>Hủy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableWithoutFeedback> 
                                    </View>     
                                </TouchableWithoutFeedback>
                            </Modal>
                        {/* MODAL IMAGE PICKER */}
                    </View>
            </SafeAreaView>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

