
// ACCOUNT
const LOGIN = 'user/login?'
const REGISTER = 'application/apply?'
const PROFILE = 'user/profile?'
const LOGOUT = 'user/logout?'
const UPDATE_PROFILE = 'user/update-profile?'
const CHANGE_PASSWORD = 'user/change-password?'
const FORGOT_PASSWORD = 'user/forget-password?'

// HOME
const LIST_HOME = 'home/home-statistics'

// CATEGORY
const LIST_CATEGORY = 'category/list-all?'

// COURSE
const LIST_COURSE = 'home/home-view-more-course?'
const SEARCH_COURSE = 'course/course-search?'
const COURSE_PROCESS = 'course/course-process?'
const COURSE_RESULT = 'course/course-learning?'
const COURSE_DETAILS = 'course/detail-course?'

// NEWS
const LIST_NEWS = 'home/home-view-more-news?'
const SEARCH_NEWS = 'news/search-news?'
const NEWS_DETAILS = 'news/detail-news?'

// NOTIFICATIONS
const SEND_DEVICE_TOKEN = 'device/index?'
const LIST_NOTIFICATION = 'push/list-notification?'
const NOTIFICATION_DETAILS = 'push/detail-notification?'

// AREA
const LIST_PROVINCE = 'area/province?'
const LIST_COUNTRY = 'area/country?'

// SUPPORT 
const SUPPORT = 'support/support?'


export default {  
    LOGIN,
    REGISTER,
    LOGOUT,
    UPDATE_PROFILE,
    PROFILE,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD,
    LIST_CATEGORY,
    LIST_HOME,
    LIST_NOTIFICATION,
    LIST_COURSE,
    LIST_NEWS,
    SEND_DEVICE_TOKEN,
    SEARCH_COURSE,
    SEARCH_NEWS,
    NEWS_DETAILS,
    COURSE_PROCESS,
    LIST_PROVINCE,
    LIST_COUNTRY,
    SUPPORT,
    COURSE_RESULT,
    COURSE_DETAILS,
    NOTIFICATION_DETAILS
}