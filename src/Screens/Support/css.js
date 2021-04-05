import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const circle = 10

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
        paddingBottom: 40
    },
    content: {
        width: width - 30,
        paddingTop: 20,
        alignItems: 'center'
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
        marginTop: 30
    },
    btnTitle: {
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        color: '#fff'
    },
    nodataWrapper: {
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
});

export { styles };