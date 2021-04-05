import { StyleSheet } from 'react-native';
import { green } from '../../../Components/Colors/Color';
import { statusbarHeight, width } from '../../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        width: width - 40,
        alignItems: 'center',
        flex: 1,
        paddingTop: 80 + statusbarHeight
    },
    logo: {
        marginBottom: 20,
        width: width/5
    },
    wellcome: {
        fontFamily: 'Montserrat-Regular',
        lineHeight: 25,
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 17
    },
    btn: {
        width: width - 50,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: green,
        marginBottom: 20
    },
    btnTitle: {
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        color: '#fff'
    }
});

export { styles };