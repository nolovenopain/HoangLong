import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.LOGOUT;

const logout = (token) => (
    fetch(API_URL + 'token=' + token, 
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

export default logout;