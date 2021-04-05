import Config from "react-native-config";
import { URL } from '../Constants';
import { Platform } from 'react-native';

const API_URL = Config.API_BASE_URL_RELEASE + URL.SEND_DEVICE_TOKEN;

const sendDeviceToken = (gcm_id, token) => (
    fetch(API_URL + 
            'gcm_id=' + gcm_id + 
            '&type=' + (Platform.OS == 'android' ? '1' : '2') + 
            '&status=1' +
            '&token=' + token,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Cache-Control': 'no-cache'
            },
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default sendDeviceToken;