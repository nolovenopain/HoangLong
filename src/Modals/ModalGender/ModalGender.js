import React, { Component } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import { green } from '../../Components/Colors/Color';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ModalGender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.closeModalGender()
    }

    chooseMale = () => {
        this.props.chooseMale()
        this.props.closeModalGender()
    }

    chooseFemale = () => {
        this.props.chooseFemale()
        this.props.closeModalGender()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    animationType='fade' 
                    transparent={true}
                    visible={this.props.modalGenderVisible}
                    statusBarTranslucent={true}
                    onRequestClose={this.closeModal}
                >
                    <TouchableWithoutFeedback onPress={this.closeModal}>
                        <View style={styles.modalWrapper}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalHeader}>
                                        <View style={styles.modalHeaderLeft}>
                                            <TouchableWithoutFeedback onPress={this.closeModal}>
                                                <Icon
                                                    name='close-circle'
                                                    size={30}
                                                    color={green}
                                                />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={styles.modalHeaderCenter}>
                                            <Text style={styles.modalHeaderTitle}>Giới tính</Text>
                                        </View>
                                        <View style={styles.modalHeaderRight}>
                                            
                                        </View>
                                    </View>

                                    <View style={styles.modalBody}>
                                        <View style={styles.row}>
                                            <TouchableWithoutFeedback onPress={this.chooseMale}>
                                                <View style={styles.rowInside}>
                                                    <MaterialCommunityIcon
                                                        name={this.props.gender == 'male' ? 'check-circle' : 'checkbox-blank-circle-outline'}
                                                        size={30}
                                                        color={this.props.gender == 'male' ? green : 'silver'}
                                                    />
                                                    <Text style={styles.rowTitle}>Nam</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>

                                        <View style={styles.row}>
                                            <TouchableWithoutFeedback onPress={this.chooseFemale}>
                                                <View style={styles.rowInside}>
                                                    <MaterialCommunityIcon
                                                        name={this.props.gender == 'female' ? 'check-circle' : 'checkbox-blank-circle-outline'}
                                                        size={30}
                                                        color={this.props.gender == 'female' ? green : 'silver'}
                                                    />
                                                    <Text style={styles.rowTitle}>Nữ</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
        )
    }
}

