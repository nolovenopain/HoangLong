import { StyleSheet } from 'react-native';
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { height, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        width: width,
        height: 250,
        backgroundColor: backgroundColorWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    modalHeaderLeft: {
        width: 80,
        paddingLeft: 10
    },
    modalHeaderCenter: {
        width: width - 160,
        alignItems: 'center'
    },
    modalHeaderRight: {
        width: 80,
        alignItems: 'center', 
    },
    modalHeaderTitle: {
        fontFamily: 'Montserrat-Medium'
    },
    modalBody: {
        width: width,
        alignItems: 'center',
        flex: 1,
        paddingTop: 20, 
    },
    row: {
        width: width,
        alignItems: 'flex-end',
        marginBottom: 20
    },
    rowInside: {
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowTitle: {
        marginLeft: 15,
        fontFamily: 'Montserrat-Regular'
    }
});

export { styles };