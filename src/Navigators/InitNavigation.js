import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../Navigators/Router';
import BottomNavigation from '../Navigators/BottomNavigation';
import Splash from '../Screens/Splash/Splash';
import CourseDetails from '../Screens/CourseDetails/CourseDetails';
import NewsDetails from '../Screens/NewsDetails/NewsDetails';
import NotificationDetails from '../Screens/NotificationDetails/NotificationDetails';
import EditProfile from '../Screens/EditProfile/EditProfile';
import ListSelection from '../Screens/ListSelection/ListSelection';
import ChangePassword from '../Screens/ChangePassword/ChangePassword';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import EducationResult from '../Screens/EducationResult/EducationResult';
import LogIn from '../Screens/LogIn/LogIn';
import Register from '../Screens/Register/Register';
import Support from '../Screens/Support/Support';
import TermAndPolicy from '../Screens/TermAndPolicy/TermAndPolicy';
import Course from '../Screens/Course/Course';
import News from '../Screens/News/News';
import Search from '../Screens/Search/Search';
import EducationProcess from '../Screens/EducationProcess/EducationProcess';
import Promotion from '../Screens/Promotion/Promotion';
import PromotionDetail from '../Screens/PromotionDetail/PromotionDetail';
import Share from '../Screens/Share/Share';

const InitialStack = createStackNavigator();

function InitialNavigation(props) {
    return(
        <NavigationContainer ref={navigationRef}>
            <InitialStack.Navigator
                initialRouteName='Splash'
                screenOptions={{ headerShown: false }}
            >
                <InitialStack.Screen
                    name='Splash'
                    component={Splash}
                />
                <InitialStack.Screen
                    name='CourseDetails'
                    component={CourseDetails}
                />
                <InitialStack.Screen
                    name='NewsDetails'
                    component={NewsDetails}
                />
                <InitialStack.Screen
                    name='NotificationDetails'
                    component={NotificationDetails}
                />
                <InitialStack.Screen
                    name='EditProfile'
                    component={EditProfile}
                />
                <InitialStack.Screen
                    name='ListSelection'
                    component={ListSelection}
                />
                <InitialStack.Screen
                    name='ChangePassword'
                    component={ChangePassword}
                />
                <InitialStack.Screen
                    name='ForgotPassword'
                    component={ForgotPassword}
                />
                <InitialStack.Screen
                    name='EducationResult'
                    component={EducationResult}
                />
                <InitialStack.Screen
                    name='LogIn'
                    component={LogIn}
                />
                <InitialStack.Screen
                    name='Register'
                    component={Register}
                />
                <InitialStack.Screen
                    name='Support'
                    component={Support}
                />
                <InitialStack.Screen
                    name='TermAndPolicy'
                    component={TermAndPolicy}
                />
                <InitialStack.Screen
                    name='Course'
                    component={Course}
                />
                <InitialStack.Screen
                    name='News'
                    component={News}
                />
                <InitialStack.Screen
                    name='Search'
                    component={Search}
                />
                <InitialStack.Screen
                    name='EducationProcess'
                    component={EducationProcess}
                />
                <InitialStack.Screen
                    name='Promotion'
                    component={Promotion}
                />
                <InitialStack.Screen
                    name='PromotionDetail'
                    component={PromotionDetail}
                />
                <InitialStack.Screen
                    name='Share'
                    component={Share}
                />
                <InitialStack.Screen
                    name='BottomNavigation'
                    component={BottomNavigation}
                />
            </InitialStack.Navigator>
        </NavigationContainer>
    )
}

export default InitialNavigation;