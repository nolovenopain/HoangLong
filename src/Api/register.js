import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.REGISTER;

const register = (name, phone, address, code_mode, email, course_id) => (
    fetch(API_URL + 
            'name=' + name + 
            '&phone=' + phone + 
            '&address=' + address + 
            '&code_mode=' + code_mode + 
            '&email=' + email +
            '&course_id=' + course_id,
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

export default register;