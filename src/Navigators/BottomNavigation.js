import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNew from '../Screens/HomeNew/HomeNew';
// import HomeOld from '../Screens/HomeOld/HomeOld';
// import EducationProcess from '../Screens/EducationProcess/EducationProcess';
import Notifications from '../Screens/Notifications/Notifications';
import Account from '../Screens/Account/Account';
import { green } from '../Components/Colors/Color';

const Tab = createBottomTabNavigator();

function BottomNavigation(props) { 
    return (
        <Tab.Navigator
            initialRouteName= "HomeNew" 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'HomeNew') {
                        iconName = focused ? 'home' : 'home';
                        size = 25
                    // } else if (route.name == 'EducationProcess') {
                    //     iconName = focused ? 'document-text-outline' : 'document-text-outline';
                    //     size = 25
                    } else if (route.name == 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications';
                        size = 25
                    } else if (route.name == 'Account') {
                        iconName = focused ? 'person' : 'person';
                        size = 25
                    } 
                    return  <Icon name={iconName} size={size} color={color}/>         
                },
            })}
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'rgba(0,0,0,0.4)',
                keyboardHidesTabBar: true,
                tabStyle: { 
                    backgroundColor: green, 
                    paddingBottom: 5,
                    paddingTop: 5
                },
                style: {
                    height: 55,   
                }
            }}
            lazy={false}
        >
            <Tab.Screen name="HomeNew" component={HomeNew} options={{ title: 'Trang chủ' }}/>
            {/* <Tab.Screen name="EducationProcess" component={EducationProcess} options={{ title: 'Xem CTĐT' }} /> */}
            <Tab.Screen name="Notifications" component={Notifications} options={{ title: 'Thông báo' }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'Tài khoản' }}/>
        </Tab.Navigator>
    );
}

export default BottomNavigation;