import { StyleSheet } from 'react-native';
import { green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Montserrat-Medium'
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
        width: 90
    },
    headerCenter: {
        width: width - 180,
        alignItems: 'center'
    },
    headerRight: {
        width: 90,
        alignItems: 'center',
        flexDirection: 'row'
    },
});

export { styles };