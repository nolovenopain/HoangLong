import { StyleSheet } from 'react-native';
import { green } from '../../Components/Colors/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: green
    },
    logo: {
        marginBottom: 15
    },
    title: {
        fontSize: 22,
        fontFamily: 'Montserrat-Medium',
        color: '#fff'
    }
});

export { styles };