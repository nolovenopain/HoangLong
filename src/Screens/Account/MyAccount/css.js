import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../../Components/Colors/Color';
import { statusbarHeight, width } from '../../../Components/Dimensions/Dimensions';

const avatarSIZE = 65;
const iconWrapperSIZE = 50;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
        flex: 1
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
    rowWrapper: {
        width: width,
        alignItems: 'center',
    },
    accountInfoRow: {
        flexDirection: 'row',
        width: width - 30,
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    left: {
        width: avatarSIZE,
        alignItems: 'center'
    },
    center: {
        width: width - 30 - avatarSIZE - 40,
        paddingLeft: 15,
    },
    right: {
        width: 40,
        alignItems: 'flex-end'
    },
    avatar: {
        width: avatarSIZE,
        height: avatarSIZE,
        borderRadius: avatarSIZE/2,
        borderWidth: 2,
        borderColor: green
    },
    name: {
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 7
    },
    email: {
        fontFamily: 'Montserrat-Regular',
        color: 'gray'
    },
    edit: {
        fontFamily: 'Montserrat-Regular',
        color: green
    },
    row: {
        flexDirection: 'row',
        width: width - 30,
        paddingVertical: 15,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        alignItems: 'center'
    },
    circle: {
        width: iconWrapperSIZE,
        height: iconWrapperSIZE,
        borderRadius: iconWrapperSIZE/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: green
    },
    rowText: {
        fontFamily: 'Montserrat-Regular',
        color: 'gray',
        fontSize: 15
    },
    btn: {
        width: width - 50,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: green,
        alignItems: 'center',
        marginTop: 50
    },
    btnTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: green,
        fontSize: 17,
    }
});

export { styles };