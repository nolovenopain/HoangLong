import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.COURSE_PROCESS;

const getEducationProcess = (user_id, page) => (
    fetch(API_URL + 
            'user_id=' + user_id +
            '&page=' + page +
            '&number_per_page=10',
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

export default getEducationProcess;