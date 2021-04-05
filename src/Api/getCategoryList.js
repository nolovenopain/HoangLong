import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.LIST_CATEGORY;

const getCategoryList = (type) => (
    fetch(API_URL + 'type=' + type, 
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

export default getCategoryList;