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
        paddingTop: 20
    },
    contentTitle: {
        fontFamily: 'Montserrat-Medium',
        lineHeight: 22,
        marginBottom: 10,
        fontSize: 16
    },
    contentText: {
        fontFamily: 'Montserrat-Regular',
        marginVertical: 15,
        lineHeight: 22
    },
    image: {
        width: width - 30,
        height: height/4
    },
});

export { styles };