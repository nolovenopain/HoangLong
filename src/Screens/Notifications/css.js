import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const elementSIZE = 70

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
        flex: 1
    },
    rowWrapper: {
        width: width,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        width: width - 40,
        paddingVertical: 10, 
        borderColor: 'silver'
    },
    image: {
        width: elementSIZE,
        height: elementSIZE
    },
    rowRight: {
        width: width - 40 - elementSIZE,
        paddingHorizontal: 15
    },
    rowTitle: {
        fontFamily: 'Montserrat-Medium',
        marginBottom: 10
    },
    rowContent: {
        fontFamily: 'Montserrat-Regular',
        marginBottom: 10,
        color: 'gray'
    },
    timeDate: {
        fontFamily: 'Montserrat-Regular',
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic'
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