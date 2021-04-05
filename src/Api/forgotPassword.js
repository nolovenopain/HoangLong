import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.FORGOT_PASSWORD;

const forgotPassword = (email) => (
    fetch(API_URL + 'email=' + email, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    .then(res => { 
        return res;
    })
    .catch(err => console.log(err))
);

export default forgotPassword;