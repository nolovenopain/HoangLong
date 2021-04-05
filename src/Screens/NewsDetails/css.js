import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const elementSize = 80

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
        paddingBottom: 40
    },
    content: {
        width: width - 30,
    },
    contentTitle: {
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: 22,
        marginBottom: 15,
        marginTop: 20,
        fontSize: 16
    },
    contentText: {
        fontFamily: 'Montserrat-Regular',
        marginVertical: 15,
        lineHeight: 22
    },
    element: {
        alignItems: 'center',
        width: elementSize,
    },
    elementImage: {
        width: elementSize,
        height: elementSize,
        marginBottom: 5,
    },
    elementTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12
    },
});

export { styles };