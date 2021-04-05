import Config from "react-native-config";
import { URL } from '../Constants';

const API_URL = Config.API_BASE_URL_RELEASE + URL.SUPPORT;

const sendEmailSupport = (info, name, code) => (
    fetch(API_URL + 
            'info=' + info + 
            '&name=' + name +
            '&code=' + code,
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

export default sendEmailSupport;