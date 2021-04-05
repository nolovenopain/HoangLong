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
        paddingTop: 40
    },
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 30
    },
    wellcome: {
        fontFamily: 'Montserrat-Regular',
        marginBottom: 15,
        lineHeight: 20
    },
    contentText: {
        fontFamily: 'Montserrat-Light',
        lineHeight: 20
    }
});

export { styles };