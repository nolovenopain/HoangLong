import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

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
    },
    row: {
        width: width - 30,
        marginBottom: 5
    },
    rowTop: {
        flexDirection: 'row',
        alignItems: 'center',
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
    name: {
        fontFamily: 'Montserrat-Regular',
        color: 'gray'
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        lineHeight: 25
    }
});

export { styles };