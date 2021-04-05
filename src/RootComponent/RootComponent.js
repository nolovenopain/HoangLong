/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import ModalInternetConnection from '../Modals/ModalInternetConnection/ModalInternetConnection';
import InitialNavigation from '../Navigators/InitNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { fetchUserToken } from '../Helpers/Functions';
import sendDeviceToken from '../Api/sendDeviceToken';
import { connect } from 'react-redux';
import { saveInternetStatus, updateListNoti, updateListCourse, updateListNews, updateListResult } from '../Action/Action';
import { bindActionCreators } from 'redux';
import { navigate } from '../Navigators/Router';

class RootComponent extends Component {

	_isMounted = false;
	NetInfoSubcribtion = null;
	
	constructor(props) {
		super(props);
		this.state = {
			modalInternetConnectionVisible: false,
		};
	}

	componentDidMount() {
		this._isMounted = true;
		if(this._isMounted) { 
			this.NetInfoSubcribtion = NetInfo.addEventListener(
				this.handleConnectivity
			)
		}
	}

	componentWillUnmount() {
        this._isMounted = false
		this.NetInfoSubcribtion && this.NetInfoSubcribtion()
	}

	handleConnectivity = state => {
		if(state.isInternetReachable) {
			const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
			firebase.notifications().android.createChannel(channel);
			this.checkPermission();
			this.createNotificationListener();
		}
		this.props.saveInternetStatus(state.isInternetReachable)
		this.setState({ modalInternetConnectionVisible: !state.isInternetReachable })
	}

	shouldComponentUpdate(nextState, nextProps) {
        if(this.state.modalInternetConnectionVisible != nextState.modalInternetConnectionVisible ) {
            return true
        }
        return false
    }

	getFcmToken = async() => {
		let fcmToken = await AsyncStorage.getItem('fcmToken');
        if(!fcmToken) { 
            fcmToken = await firebase.messaging().getToken(); 
            if(fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
		let userToken = await fetchUserToken();
		sendDeviceToken(fcmToken, userToken ? userToken : '');
	}

	checkPermission = async() => {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            this.getFcmToken();
        }
        else {
            this.requestPermission();
        }
	}
	
	requestPermission = async() => {
        try {
            await firebase.messaging().requestPermission();
            this.getFcmToken()
        } catch(error) {
            console.log('permission rejected')
        }
	}
	
	createNotificationListener = () => { 
        firebase.notifications().onNotification(notification => { console.log(notification)
			notification.android.setChannelId('insider').setSound('default')
			notification.android.setSmallIcon('iconapp')
			notification.android.setAutoCancel(true)
            firebase.notifications().displayNotification(notification)

			this.props.updateListNoti()
			if(notification._data.type.includes('course')) {
				this.props.updateListCourse()
			}
			else if(notification._data.type.includes('news')) {
				this.props.updateListNews()
			}
			else if(notification._data.type.includes('result')) {
				this.props.updateListResult()
			}
		})

		firebase.notifications().onNotificationOpened(notification => {
			if(notification.notification._data.type) {
				if(notification.notification._data.type.includes('course')) { 
                    navigate('CourseDetails', { courseId: notification.notification._data.course_id });
                }
				else if(notification.notification._data.type.includes('news')) {
					navigate('NewsDetails', { newsId: notification.notification._data.news_id });
				}
				else if(notification.notification._data.type.includes('normal')) {
					navigate('NotificationDetails', { notificationId: notification.notification._data.notification_id });
				}
				else if(notification.notification._data.type.includes('result')) {
					navigate('EducationProcess');
				}
			}
		})

		firebase.notifications().getInitialNotification(notification => {
			if(notification.notification._data.type) {
				if(notification.notification._data.type.includes('course')) { 
                    navigate('CourseDetails', { courseId: notification.notification._data.course_id });
                }
				else if(notification.notification._data.type.includes('news')) {
					navigate('NewsDetails', { newsId: notification.notification._data.news_id });
				}
				else if(notification.notification._data.type.includes('normal')) {
					navigate('NotificationDetails', { notificationId: notification.notification._data.notification_id });
				}
				else if(notification.notification._data.type.includes('result')) {
					navigate('EducationProcess');
				}
			}
		})

	}

    closeModalInternetConnection = () => {
        this.setState({ modalInternetConnectionVisible: false })
	}

	render() {
		return (
			<>
                <InitialNavigation/>
				{/* MODAL INTERNET CONNECTION */}
					<ModalInternetConnection
						modalInternetConnectionVisible={this.state.modalInternetConnectionVisible}
						closeModalInternetConnection={this.closeModalInternetConnection}
					/>
                {/* MODAL INTERNET CONNECTION */}
			</>
		);
	}  
}

const mapStateToProps = (state) => {
	const { obj } = state
    return { obj }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveInternetStatus,
		updateListNoti,
		updateListCourse,
		updateListNews,
		updateListResult       
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
