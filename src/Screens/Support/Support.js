import React, { Component } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import { styles } from './css'
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { loading } from '../../Helpers/Functions';
import { connect } from 'react-redux';
import { images } from '../../Constants';
import sendEmailSupport from '../../Api/sendEmailSupport';

class Support extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            information: '',
            name: '',
            student_code: '',
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

    sendRequest = async() => {
        if(this.props.obj.internetConnection) {
            if(this.state.information == '') {
                Alert.alert('Thông báo', 'Hãy điền thông tin cần hỗ trợ')
            }
            else {
                try {
                    this.setState({ loaded: false })
                    const res = await sendEmailSupport(
                        this.state.information,
                        this.props.obj.info.name,
                        this.props.obj.info.username
                    );
                    if(res.status == 200) {
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        if(resp.code == 200) {
                            Alert.alert('Thành công', 'Gửi yêu cầu hỗ trợ thành công')
                            this.goBack()
                        }
                        else if(resp.code == 204) {
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
                            {text: 'Try Again', onPress: () => this.sendRequest()}
                        ]
                    )
                }
            }  
        }
        else {
            Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể gửi yêu cầu hỗ trợ')
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
                            <Text style={styles.headerTitle}>Hỗ trợ</Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}
                    > 
                        {Object.keys(this.props.obj.info).length > 0 && this.props.obj.userToken ?
                            <View style={styles.content}>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputTitle}>Nhập thông tin cần hỗ trợ Gấp !</Text>
                                    <View style={styles.input}>
                                        <Input
                                            placeholder='Nhập thông tin'
                                            name='information'
                                            setValue={this.setValue}
                                            editable={true}
                                            multiline={true}
                                            hideshowText={false}
                                            width={width - 60}
                                            minHeight={200}
                                            onRef={ref => (this.childInformation = ref)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputTitle}>Họ và tên</Text>
                                    <View style={styles.input}>
                                        <Input
                                            placeholder='Nhập họ và tên'
                                            name='name'
                                            oldValue={this.props.obj.info.name}
                                            editable={false}
                                            multiline={false}
                                            hideshowText={false}
                                            width={width - 60 - 40}
                                            btnGroupWidth={30}
                                            length={40}
                                            marginLeft={10}
                                            onRef={ref => (this.childName = ref)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputTitle}>Mã học viên</Text>
                                    <View style={styles.input}>
                                        <Input
                                            placeholder='Nhập mã học viên'
                                            name='student_code'
                                            oldValue={this.props.obj.info.username}
                                            editable={false}
                                            multiline={false}
                                            hideshowText={false}
                                            width={width - 60 - 40}
                                            btnGroupWidth={30}
                                            length={40}
                                            marginLeft={10}
                                            onRef={ref => (this.childStudentCode = ref)}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={this.sendRequest}
                                >
                                    <Text style={styles.btnTitle}>Gửi yêu cầu</Text>
                                </TouchableOpacity>
                            </View>
                                :
                            <View style={styles.nodataWrapper}>
                                <Image
                                    style={styles.logo}
                                    source={images.logo2}
                                    resizeMode='contain'
                                />
                                <Text style={styles.notice}>Chức năng hỗ trợ chỉ dành cho học viên của Hoàng Long CMS</Text>
                            </View>
                        }
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

export default connect(mapStateToProps)(Support);
