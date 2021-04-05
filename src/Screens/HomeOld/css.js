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
        alignItems: 'center'
    },
    searchBarWrapper: {
        width: width - 40,
        borderRadius: 10,
        backgroundColor: backgroundColorWhite,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    search:{
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0,0,0,0.4)'
    },
    iconWrapper: {
        width: 40,
        alignItems: 'center'
    },
    body: {
        width: width,
        alignItems: 'center',
    },
    banner: {
        width: width,
        height: height/4,
    },
    headerBodyTab: {
        paddingTop: 10,
        alignItems: 'center'
    },
    headerBodyTabWrapper: {
        marginBottom: 5,
        width: width,
        paddingRight: 15
    },
    headerBodyTabTitle: {
        marginBottom: 10
    },
    shortlist: {
        width: width,
        alignItems: 'center',
    },
    elementListBody: {
        width: width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
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
    rightElement: {
        marginBottom: 3
    },
    elementText: {
        fontFamily: 'Montserrat-Medium',
        color: 'gray',
        fontSize: 12
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
    bannerWrapper: {
        flex: 1
    },
    viewMoreWrapper: {
        width: width - 30,
        alignItems: 'flex-end',
    },
    viewMore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    viewMoreTitle: {
        fontFamily: 'Montserrat-Regular',
        color: green,
        fontSize: 12
    }
});

export { styles };