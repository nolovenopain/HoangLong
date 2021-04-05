import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.NEWS_DETAILS;

const getNewsDetails = (news_id) => (
    fetch(API_URL + 'news_id=' + news_id,
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

export default getNewsDetails;