import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.LOGIN;

const login = (username, password) => (
    fetch(API_URL + 
            'username=' + username + 
            '&password=' + password + 
            '&login_type=n', 
        {
            method: 'GET',
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

export default login;