import { combineReducers } from 'redux';
import INITIAL_STATE from '../Store/Store';

const reducer = (state = INITIAL_STATE, action) => { 
    switch (action.type) {
        case 'SAVE_USER_INFO': 
            return {
                ...state,
                info: action.info,
                userToken: action.userToken
            }
        case 'SAVE_INTERNET_STATUS': 
            return {
                ...state,
                internetConnection: action.internetConnection
            }
        case 'CHANGE_NOTI_COUNT':
            return {
                ...state,
                notiCount: state.notiCount++
            }
        case 'CHANGE_COURSE_COUNT':
            return {
                ...state,
                notiTypeCourseCount: state.notiTypeCourseCount++
            }
        case 'CHANGE_NEWS_COUNT':
            return {
                ...state,
                notiTypeNewsCount: state.notiTypeNewsCount++
            }
        case 'CHANGE_RESULT_COUNT':
            return {
                ...state,
                notiTypeResultCount: state.notiTypeResultCount++
            }
        default:
            return state
    }
};

export default combineReducers({
    obj: reducer,
});
