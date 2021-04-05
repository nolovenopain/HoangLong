import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.CHANGE_PASSWORD;

const changePassword = (token, current_password, new_password) => (
    fetch(API_URL + 
            'token=' + token + 
            '&current_password=' + current_password + 
            '&new_password=' + new_password, 
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

export default changePassword;