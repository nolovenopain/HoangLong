import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const circle = 10

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
        flex: 1,
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: green,
        paddingTop: statusbarHeight + 20
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
        flex: 1
    },
    content: {
        width: width - 30,
        flex: 1
    },
    row: {
        width: width - 30,
        marginTop: 20,
        alignItems: 'center'
    },
    rowTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    rowBottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeft: {
        width: 30,
        alignItems: 'center'
    },
    rowRight: {
        width: width - 30 - 30
    },
    circle: {
        width: circle,
        height: circle,
        borderRadius: circle/2,
        backgroundColor: green
    },
    time: {
        fontFamily: 'Montserrat-Regular',
        color: 'gray'
    },
    image: {
        width: width - 50,
        height: height/3,
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        lineHeight: 25
    },
    authenWrapper: {
        height: height - 120,
        width: width - 50,
        top: '25%',
        alignItems: 'center'
    },
    logo: {
        marginBottom: 25,
        width: width/5
    },
    notice: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        lineHeight: 25,
        fontSize: 16,
        color: 'gray'
    },
    itemLoader: {
        marginTop: 20
    },
    bodyHeader: {
        alignItems: 'center'
    },
    noData: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        top: height/4,
        color: 'gray'
    },
    noDataWrapper: {
        width: width - 30,
        alignItems: 'center'
    }
});

export { styles };