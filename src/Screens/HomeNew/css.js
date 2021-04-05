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
    iconWrapper: {
        width: 45,
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        fontSize: 18
    },
    body: {
        width: width,
        alignItems: 'center',
    },
    bodyHeader: {
        width: width,
        backgroundColor: green,
        paddingBottom: 15,
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 25,
        paddingTop: 10
    },
    logo: {
        width: width/8,
        height: width/8,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: width
    },
    rowLeft: {
        width: (width - 80)/3,
        alignItems: 'center'
    },
    rowCenter: {
        width: (width - 80)/3,
        alignItems: 'center'
    },
    rowRight: {
        width: (width - 80)/3,
        alignItems: 'center'
    },
    iconBox: {
        width: (width - 80)/3,
        alignItems: 'center',
        paddingVertical: 20,
        borderColor: green,
        borderWidth: 1,
        alignItems: 'center' ,
        backgroundColor: 'rgba(91,191,25,0.1)',
        marginBottom: 10
    },
    iconBoxTitle: {
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center'
    },
    homeBackground: {
        width: width,
        height: height - 55 - statusbarHeight - 40,
    },
    name: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginBottom: 5
    },
    username: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
    }
});

export { styles };