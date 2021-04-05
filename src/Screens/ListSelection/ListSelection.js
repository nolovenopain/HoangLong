import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, Alert, ActivityIndicator } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import getProvinceList from '../../Api/getProvinceList';
import getCountryList from '../../Api/getCountryList';
import { connect } from 'react-redux';

class ListSelection extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            cityList: [],
            countryList: [],
            itemLoading: false,
            handleLoadMore: false,
            page: 1,
            refresh: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => { 
            if(this._isMounted && this.props.obj.internetConnection) {
                if(this.props.route.params.type == 'city') {
                    const cityList = await this.getProvinceList()
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        loaded: true,
                        cityList,
                    })
                }
                else if(this.props.route.params.type == 'country') {
                    const countryList = await this.getCountryList()
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        loaded: true,
                        countryList,
                    })
                }
                else {
                    this.setState({ loaded: true });
                }      
            } 
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.handleLoadMore != nextState.handleLoadMore ||
            this.state.refresh != nextState.refresh ||
            this.state.cityList.length != nextState.cityList.length ||
            this.state.countryList.length != nextState.countryList.length ||
            this.props.obj.internetConnection != nextProps.obj.internetConnection) {
            return true
        }
        return false
    }

    componentDidUpdate(prevProps) {
        if((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) { 
            this.setState({
                page: 1,
                loaded: false
            }, async() => {
                if(this.props.route.params.type == 'city') {
                    const cityList = await this.getProvinceList()
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        loaded: true,
                        cityList,
                    })
                }
                else if(this.props.route.params.type == 'country') {
                    const countryList = await this.getCountryList()
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        loaded: true,
                        countryList,
                    })
                }
                else {
                    this.setState({ loaded: true });
                }      
            })
        }
    }

    getProvinceList = async() => {
        try {
            var cityList = []
            const res = await getProvinceList(this.state.page);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    cityList = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return cityList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getProvinceList()}
                ]
            )
        }
    }
    
    getCountryList = async() => {
        try {
            var countryList = []
            const res = await getCountryList(this.state.page);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    countryList = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return countryList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getCountryList()}
                ]
            )
        }
    }

    goBack = () => {
        goBack()
    }

    select = item => e => {
        if(this.props.route.params.type == 'city') {
            this.props.route.params.getCity(item)
            goBack()
        }
        else if (this.props.route.params.type == 'country') {
            this.props.route.params.getCountry(item)
            goBack()
        }
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
            if(this.props.route.params.type == 'city') {
                const cityList = await this.getProvinceList()
                if(cityList.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        cityList: [...this.state.cityList,...cityList],
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        cityList: [...this.state.cityList,...cityList],
                    })
                }
            }
            else if(this.props.route.params.type == 'country') {
                const countryList = await this.getCountryList()
                if(countryList.length < 10) {
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false,
                        countryList: [...this.state.countryList,...countryList],
                    })
                } 
                else {
                    this.setState({
                        itemLoading: true,
                        handleLoadMore: true,
                        countryList: [...this.state.countryList,...countryList],
                    })
                }
            }
        });       
    }

    refresh = () => {
        this.setState({ 
            page: 1,
            refresh: true
        },  async() => {
                if(this.props.obj.internetConnection) {
                    if(this.props.route.params.type == 'city') {
                        const cityList = await this.getProvinceList()
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            cityList,
                        })
                    }
                    else if(this.props.route.params.type == 'country') {
                        const countryList = await this.getCountryList()
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true,
                            countryList,
                        })
                    }
                }
                else {
                    if(this.props.route.params.type == 'city') {
                        Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại dánh sách tỉnh/thành phố')
                    }
                    else if(this.props.route.params.type == 'country') {
                        Alert.alert('Lỗi kết nối', 'Không có kết nối internet, không thể tải lại dánh sách các quốc gia')
                    }
                }
            }
        );
    }

    scrollToTop = () => {
        if(this.props.route.params.type == 'city' && this.state.cityList.length > 0) {
            this.cityListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
        else if(this.props.route.params.type == 'country' && this.state.countryList.length > 0) {
            this.countryListRef.scrollToOffset({ animated: true, offset: 0 });
        }
    } 

    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.select(item)}>
                <View style={styles.bodyElement}>
                    <View style={styles.bodyElementInside}>
                        <View style={styles.elementLeft}>
                            <Text style={styles.title}>
                                {this.props.route.params.type == 'city' ? item.name : item.country_name}
                            </Text>
                        </View>
                        <View style={styles.elementRight}>
                            {/* {item.value ? 
                                <Icon
                                    name='checkmark'
                                    color={green}
                                    size={20}
                                /> : null
                            } */}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
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
                                <Text style={styles.headerTitle}>{this.props.route.params.title}</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <View style={styles.body}>
                            <FlatList
                                contentContainerStyle={{ paddingBottom: 20 }}
                                ref={(ref) => { ref =this.props.route.params.type == 'city' ?  this.cityListRef : this.countryListRef }}
                                data={
                                    this.props.route.params.type == 'city' ? 
                                        this.state.cityList : this.state.countryList
                                }
                                refreshing={this.state.refresh}
                                onRefresh={this.refresh}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={this.state.handleLoadMore && this.props.obj.internetConnection ? this.handleLoadMore : null}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { obj } = state
    return { obj }
};

export default connect(mapStateToProps)(ListSelection);
