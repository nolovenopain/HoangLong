import React, { Component } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { styles } from './css'
import Wellcome from './Wellcome/Wellcome';
import MyAccount from './MyAccount/MyAccount';
import { fetchUserToken, loading } from '../../Helpers/Functions';
import getUserProfile from '../../Api/getUserProfile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUserInfo } from '../../Action/Action';

class Account extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true
        };
    }

    async componentDidMount() {
        this._isMounted = true 
        if(this._isMounted) {
            const userToken = await fetchUserToken();
            if(userToken && this.props.obj.internetConnection) {
                const user = await this.getUserProfile(userToken)
                this.props.saveUserInfo(user, userToken)
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextState, nextProps) {
        if(this.state.loaded != nextState.loaded ) {
            return true
        }
        else if(this.props.obj != nextProps.obj) {
            return true
        }
        return false
    }

    async componentDidUpdate(prevProps) {
        if((prevProps.obj.internetConnection != this.props.obj.internetConnection) && this.props.obj.internetConnection) {
            const userToken = await fetchUserToken();
            const user = await this.getUserProfile(userToken)
            this.props.saveUserInfo(user, userToken)
        }
    }

    getUserProfile = async(token) => {
        try {
            const res = await getUserProfile(token);
            var user = {}
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                   user = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp.message)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return user
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getUserProfile()}
                ]
            )
        }
    }

    unLoaded = () => {
        this.setState({ loaded: false })
    }

    loaded = () => {
        this.setState({ loaded: true })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {!this.state.loaded ? loading() : null}
                <View style={styles.container}>
                    {Object.keys(this.props.obj.info).length == 0 && !this.props.obj.userToken ? 
                        <Wellcome />
                            :
                        <MyAccount 
                            getUserProfile={this.getUserProfile}
                            unLoaded={this.unLoaded}
                            loaded={this.loaded}
                            internetConnection={this.props.obj.internetConnection}
                        />
                    }
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
