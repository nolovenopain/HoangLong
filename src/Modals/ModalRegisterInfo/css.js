import { StyleSheet } from 'react-native';
import { backgroundColorWhite, green } from '../../Components/Colors/Color';
import { height, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        width: width,
        backgroundColor: backgroundColorWhite,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
        height: height * 0.85
    },
    header: {
        width: width - 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLeft: {
        width: (width - 50) * 2/3
    },
    headerRight: {
        width: (width - 50)/3,
        alignItems: 'flex-end'
    },
    headerTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 17
    },
    body: {
        width: width - 50,
        paddingTop: 20
    },
    inputTitle: {
        fontFamily: 'Montserrat-Medium',
        marginBottom: 7
    },
    inputWrapper: {
        marginBottom: 10
    },
    input: {
        width: width - 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'silver',
        alignItems: 'center',
        paddingVertical: 3
    },
    btn: {
        width: width - 50,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: green,
        alignItems: 'center',
        marginTop: 30
    },
    btnTitle: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 17
    }
});

export { styles };