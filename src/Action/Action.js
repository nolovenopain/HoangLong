export const saveUserInfo = (info, userToken) => (
    {
        type: 'SAVE_USER_INFO',
        info,
        userToken
    }
);

export const saveInternetStatus = (internetConnection) => (
    {
        type: 'SAVE_INTERNET_STATUS',
        internetConnection,
    }
)

export const updateListNoti = () => (
    {
        type: 'CHANGE_NOTI_COUNT',
    }
)

export const updateListCourse = () => (
    {
        type: 'CHANGE_COURSE_COUNT',
    }
)

export const updateListNews = () => (
    {
        type: 'CHANGE_NEWS_COUNT',
    }
)

export const updateListResult = () => ( console.log('nhay vao day'),
    {
        type: 'CHANGE_RESULT_COUNT',
    }
)

