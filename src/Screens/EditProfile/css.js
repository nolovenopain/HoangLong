import { StyleSheet } from 'react-native';
import { green, backgroundColorWhite } from '../../Components/Colors/Color';
import { width, height, statusbarHeight } from '../../Components/Dimensions/Dimensions';

const avatarSIZE = 80

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
        paddingTop: 20
    },
    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 20
    },
    avatar: {
        width: avatarSIZE,
        height: avatarSIZE,
        borderRadius: avatarSIZE/2,
        borderWidth: 2,
        borderColor: green,
    },
    row: {
        width: width - 30,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 5
    },
    left: {
        width: (width - 30)/2,
    },
    inputTitle: {
        fontFamily: 'Montserrat-Medium',
    },
    right: {
        width: (width - 30)/2,
    },
    selectTitle: {
        marginRight: 5,
        color: 'gray',
        fontFamily: 'Montserrat-Regular'
    },
    btn: {
        width: width - 60,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: green,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 40
    },
    btnTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: green,
        fontSize: 17
    },
    modalBackground: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: height,
    },
    modalPicker: {
        height: 160,
        width: width/1.1,
        top: height/1.3
    },
    imgPicker: {
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancel: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    takePhoto: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
    },
    libraryPhoto: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
    },
    modalImageText: {
        fontFamily: 'Montserrat-Regular'
    }
});

export { styles };