import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
        flex: 1
    },
    logo: {
        marginBottom: 25,
        width: width/5
    },
    content: {
        width: width - 40,
        alignItems: 'center',
        flex: 1,
        paddingTop: height/13 + statusbarHeight
    },
    inputTitle: {
        fontFamily: 'Montserrat-Medium',
        marginBottom: 7
    },
    inputWrapper: {
        marginBottom: 10
    },
    input: {
        width: width - 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'silver',
        alignItems: 'center',
        paddingVertical: 3
    },
    btn: {
        width: width - 50,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: green,
        marginTop: 30,
        marginBottom: 10
    },
    btnTitle: {
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        color: '#fff'
    },
    footer: {
        paddingVertical: 7,
        marginBottom: 10
    },
    footerTitle: {
        fontFamily: 'Montserrat-Medium',
        color: green
    }
});

export { styles };