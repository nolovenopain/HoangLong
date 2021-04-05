import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';

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
        flex: 1,
        width: width,
        alignItems: 'center',
    },
    bodyElement: {
        width: width,
        alignItems: 'flex-end'
    },
    bodyElementInside: {
        width: width - 20,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    elementLeft: {
        width: (width - 30)/2
    },
    elementRight :{
        width: (width - 30)/2,
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'Montserrat-Regular'
    } ,
    itemLoader: {
        marginTop: 20
    }  
});

export { styles };