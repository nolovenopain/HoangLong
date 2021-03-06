import React, { Component } from 'react';
import { Text, SafeAreaView, View, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator, Alert } from 'react-native';
import { green } from '../../Components/Colors/Color';
import { images } from '../../Constants';
import { styles } from './css'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import getEducationProcess from '../../Api/getEducationProcess';
import getEducationResult from '../../Api/getEducationResult';
import { loading } from '../../Helpers/Functions';
import moment from 'moment';

class EducationProcess extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            refreshScreen: false,
            loaded: false,
            listProcess: [],
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
            page: 1,
            result: {}
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this.props.obj.userToken && this._isMounted && this.props.obj.internetConnection) {
                const listProcess = await this.getEducationProcess()
                const result = await this.getEducationResult()
                if(listProcess.length < 10) {
                    this.setState({ 
                        listProcess,
                        loaded: true,
                        handleLoadMore: false, 
                        itemLoading: false,
                        result  
                    })
                } 
                else {
                    this.setState({
                        listProcess,
                        loaded: true,
                        handleLoadMore: true, 
                        itemLoading: true,
                        result  
                    })
                }          
            }
            else {
                this.setState({ loaded: true })
            }  
        }, 500);     
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.handleLoadMore != nextState.handleLoadMore ||
            this.state.listProcess != nextState.listProcess ||
            this.state.refresh != nextState.refresh ||
            this.props.obj.internetConnection != nextProps.obj.internetConnection ||
            this.props.obj.notiTypeResultCount != nextProps.obj.notiTypeResultCount) {
                return true
        }
        return false
    }

    componentDidUpdate(prevProps) {
        if( ((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) ||
                prevProps.obj.notiTypeResultCount != this.props.obj.notiTypeResultCount) { 
            this.setState({
                page: 1,
                loaded: false
            }, async() => {
                const listProcess = await this.getEducationProcess()
                const result = await this.getEducationResult()
                if(listProcess.length < 10) {
                    this.setState({ 
                        listProcess,
                        loaded: true,
                        handleLoadMore: false, 
                        itemLoading: false,
                        result  
                    })
                } 
                else {
                    this.setState({
                        listProcess,
                        loaded: true,
                        handleLoadMore: true, 
                        itemLoading: true,
                        result  
                    })
                }       
            })
        }
    }

    getEducationResult = async() => { 
        try {
            var result = {}
            const res = await getEducationResult(this.props.obj.info.id);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    result = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return result
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getEducationResult()}
                ]
            )
        }
    }

    getEducationProcess = async() => { 
        try {
            var listProcess = []
            const res = await getEducationProcess(this.props.obj.info.id, this.state.page);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    listProcess = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return listProcess
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getEducationProcess()}
                ]
            )
        }
    }

    goBack = () => {
        goBack()
    }

    renderFooter = () => {
        return( 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large' color='rgba(0,0,0,0.4)'/>
            </View> 
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  async() => {
                const listProcess = await this.getEducationProcess()
                if(listProcess.length < 10) {
                    this.setState({ 
                        listProcess: [...this.state.listProcess,...listProcess],
                        handleLoadMore: false, 
                        itemLoading: false  
                    })
                } 
                else {
                    this.setState({
                        listProcess: [...this.state.listProcess,...listProcess],
                        handleLoadMore: true, 
                        itemLoading: true  
                    })
                }          
            });       
    }

    refresh = () => {
        this.setState({ 
            page: 1,
            refresh: true
        },  async() => {
                if(this.props.obj.internetConnection) {
                    const listProcess = await this.getEducationProcess()
                    const result = await this.getEducationResult()
                    if(listProcess.length < 10) {
                        this.setState({ 
                            listProcess,
                            handleLoadMore: false, 
                            itemLoading: false,
                            refresh: false,
                            result  
                        })
                    } 
                    else {
                        this.setState({
                            listProcess,
                            handleLoadMore: true, 
                            itemLoading: true,
                            refresh: false,
                            result  
                        })
                    }             
                }
                else {
                    Alert.alert('L???i k???t n???i', 'Kh??ng c?? k???t n???i internet, kh??ng th??? t???i l???i ti???n tr??nh h???c t???p')
                }
            }
        );
    }

    scrollToTop = () => {
        if(this.state.listProcess.length > 0) {
            this.listProcessRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    renderRow = ({ item, index }) => { 
        return (
            <View style={styles.row}>
                <View style={styles.rowTop}>
                    <View style={styles.rowLeft}>
                        <View style={styles.circle}></View>
                    </View>
                    <View style={styles.rowRight}>
                        <Text style={styles.time}>
                            {moment(item.created_at).format('HH:mm')} Ng??y {moment(item.created_at).format('DD/MM/YY')}
                        </Text>
                    </View>
                </View>
                <View style={styles.rowBottom}>
                    <View style={styles.rowLeft}>
                        
                    </View>
                    <View style={styles.rowRight}>
                        <Text style={styles.text}>
                            H??? v?? t??n:  <Text style={{ color: green }}>{item.name}</Text> {'\n'}
                            M?? h???c vi??n:  <Text style={{ color: green }}>{item.user_id}</Text> {'\n'}
                            {item.lesson && item.lesson != '' ? 'H???c ?????n b??i: ' + item.lesson + '\n' : ''}
                            {item.point && item.point != '' ? '??i???m s???: ' +  item.point.toUpperCase() + '\n' : ''}
                            L???i vi ph???m:  <Text style={{ color: 'red'}}>{item.error}</Text>
                        </Text>
                    </View>
                </View>
                {item.image && item.image != '' ?
                    <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                        resizeMode='contain'
                    /> : null
                }
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View style={styles.bodyHeader}>
                <View style={styles.row}>
                    <View style={styles.rowTop}>
                        <View style={styles.rowLeft}>
                            <View style={styles.circle}></View>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.time}>
                                {moment(this.state.result.created_at).format('HH:mm')} Ng??y {moment(this.state.result.created_at).format('DD/MM/YY')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rowBottom}>
                        <View style={styles.rowLeft}>
                            
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.text}>
                                M?? h???c vi??n:  <Text style={{ color: green }}>{this.state.result.user_id}</Text> {'\n'}
                                {this.state.result.name_company != '' ? 'T??n c??ng ty:  ' + this.state.result.name_company + '\n' : ''}
                                {this.state.result.address != '' ? '?????a ch???:  ' + this.state.result.address + '\n' : ''}
                                {this.state.result.time_start != '' ? 'Th???i gian l??m vi???c:  ' + this.state.result.time_start + '\n' : ''}
                                {this.state.result.accommodation != '' ? 'Ch??? ???:  ' + this.state.result.accommodation + '\n' : ''}
                                {this.state.result.vehicle != '' ? 'Ph????ng ti???n ??i l???i:  ' + this.state.result.vehicle + '\n' : ''}
                                {this.state.result.salary != '' ? 'M???c l????ng:  ' + this.state.result.salary + '\n' : ''}
                                {this.state.result.job_description != '' ? 'C??ng vi???c c??? th???:  ' + this.state.result.job_description + '\n' : ''}
                            </Text>
                        </View>
                    </View>
                </View>
                {this.state.result.image && this.state.result.image != '' ?
                    <Image
                        style={styles.image}
                        source={{ uri: this.state.result.image }}
                        resizeMode='contain'
                    /> : null
                }
            </View>
        )
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
                                    size={30}
                                    color='#fff'
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Xem CT??T</Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <View style={styles.body}>
                        {Object.keys(this.props.obj.info).length > 0 && this.props.obj.userToken ?
                            <View style={styles.content}>
                                {!this._isMounted && !this.state.loaded ? null : 
                                    this.state.listProcess.length == 0 && Object.keys(this.state.result).length == 0 ?
                                        <View style={styles.noDataWrapper}>
                                            <Text style={styles.noData}>Kh??ng c?? d??? li???u ??i???m</Text>
                                        </View>
                                            :
                                        <FlatList
                                            contentContainerStyle={{ paddingBottom: 30 }}
                                            ref={(ref) => { this.listProcessReft = ref }}
                                            data={this.state.listProcess}
                                            refreshing={this.state.refresh}
                                            onRefresh={this.refresh}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            onEndReached={this.state.handleLoadMore && this.props.obj.internetConnection ? this.handleLoadMore : null}
                                            onEndReachedThreshold={0.1}
                                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                            ListHeaderComponent={Object.keys(this.state.result).length > 0 ? this.renderHeader : null}
                                            disableVirtualization={true}
                                            showsVerticalScrollIndicator={false} 
                                        /> 
                                }

                            </View>
                               :
                            <View style={styles.authenWrapper}>
                                <Image
                                    style={styles.logo}
                                    source={images.logo2}
                                    resizeMode='contain'
                                />
                                <Text style={styles.notice}>N???i dung ch????ng tr??nh ????o t???o ch??? d??nh cho h???c vi??n c???a Ho??ng Long CMS</Text>
                            </View>
                        }
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

export default connect(mapStateToProps)(EducationProcess);
