import React from 'react';
import {
    PermissionsAndroid,
    View,
    Modal,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { height, width } from '../Components/Dimensions/Dimensions';

export function loading() {
    return (
        <Modal
            animationType='fade'
            visible={true}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.backgroundLoading}>
                <ActivityIndicator size='large' color='gray'/>
            </View>
        </Modal>
       
    );
}

export async function fetchUserToken() {
    try{
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch(error) {
        console.log(error)
    }  
}

export async function fetchLat() {
    try{
        const lat = await AsyncStorage.getItem('lat');
        return lat;
    } catch(error) {
        console.log(error)
    }  
}

export async function fetchLong() {
    try{
        const long = await AsyncStorage.getItem('long');
        return long;
    } catch(error) {
        console.log(error)
    }  
}

export async function requestLocationPermission() {
    try{
        var granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Fast Food Delivery',
                'message': 'Fast Food Delivery access to your location'
            }
        )
        if(granted = PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
        }
        else {
            console.log("location permission denied")
        }
    } catch(error) {
        console.log(error)
    }  
}

const styles = StyleSheet.create({
    backgroundLoading: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        opacity: 0.5
    },
})