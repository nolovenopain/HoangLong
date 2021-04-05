import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, width } from '../../Components/Dimensions/Dimensions';

const elementSIZE = 80;

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
        backgroundColor: green,
        width: width,
        paddingTop: 40,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerLeft: {
        width: 50,
        alignItems: 'center',
    },
    headerRight: {
        width: width - 70,
    },
    searchBarWrapper: {
        paddingLeft: 10,
        width: width - 70,
        borderRadius: 10,
        backgroundColor: backgroundColorWhite,
        flexDirection: 'row',
        alignItems: 'center',
    },
    search:{
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0,0,0,0.4)'
    },
    iconWrapper: {
        width: 40,
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: 'silver'
    },
    body: {
        width: width,
        alignItems: 'center',
        flex: 1
    },
    elementListBody: {
        width: width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        paddingVertical: 12
    },
    elementListBodyLeft: {
        width: elementSIZE
    },
    elementListBodyRight: {
        width: width - 30 - elementSIZE,
        paddingHorizontal: 15
    },
    elementImage: {
        width: elementSIZE,
        height: elementSIZE,
    },
    elementTitle: {
        fontFamily: 'Montserrat-Medium',
        marginBottom: 3
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightRowText: {
        fontFamily: 'Montserrat-Medium',
        color: 'gray',
        marginLeft: 5,
        fontSize: 12
    },
    rightElement: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    elementText: {
        fontFamily: 'Montserrat-Medium',
        color: 'gray',
        fontSize: 12
    },
    itemLoader: {
        marginTop: 20
    },
    noData: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        top: height/4,
        color: 'gray'
    }
});

export { styles };