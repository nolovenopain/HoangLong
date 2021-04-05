import Config from "react-native-config";
import { URL } from '../Constants';

const API_URL = Config.API_BASE_URL_RELEASE + URL.LIST_COUNTRY;

const getCountryList = (page) => (
    fetch(API_URL + 
            '&page=' + page + 
            '&number_per_page=20'+ 
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

export default getCountryList;