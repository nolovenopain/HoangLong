import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
        flex: 1,
        paddingBottom: 15
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: green,
        paddingTop: statusbarHeight + 10
    },
    headerLeft: {
        width: 50,
        alignItems: 'center'
    },
    headerCenter: {
        width: width - 100,
        alignItems: 'center',
    },
    headerRight: {
        width: 50,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#fff'
    },
    body: {
        width: width,
        alignItems: 'center',
        paddingBottom: 20,
    },
    content: {
        width: width - 30,
    },
    image: {
        width: width,
        height: height/5,
        marginBottom: 10
    },
    orderTitle: {
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5
    },
    locationWrapper: {
        width: width - 30,
        alignItems: 'center',
        marginBottom: 15
    },
    locationInside: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 30,
        paddingVertical: 7,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    location: {
        marginLeft: 5,
        fontFamily: 'Montserrat-Regular'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    rowTitle: {
        fontFamily: 'Montserrat-Regular',
        marginLeft: 5
    },
    highlight: {
        fontFamily: 'Montserrat-Medium',
        lineHeight: 20
    },
    separateWrapper: {
        width: width - 30,
        alignItems: 'center',
        marginVertical: 15
    },
    separate: {
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        width: width - 40
    },
    contentTitle: {
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5
    },
    contentText: {
        fontFamily: 'Montserrat-Regular',
        lineHeight: 20
    },
    btn: {
        width: width - 30,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: green,
        alignItems: 'center',
        marginTop: 10
    },
    btnTitle: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 17
    },
    left: {
        width: 25,
    },
    right: {
        width: width - 55
    },
    imageSlide: {
        flex: 1
    },
    noImage: {
        width: width,
        height: height/4,
        marginBottom: 15
    },
    noDataCourse: {
        top: height/3,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: 'gray'
    }
});

export { styles };