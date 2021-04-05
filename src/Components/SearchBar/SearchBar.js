import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./css";
import _ from 'lodash';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            input: ''
        };
    }

    componentDidMount() { 
        this.props.onRef ? this.props.onRef(this) : null
    }
    
    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    handleFocus = () => 
        this.setState({ 
            isFocused: true, 
        });

    handleBlur = () =>  
        this.setState({ 
            isFocused: false,
        });
    
    clearSearch = () => {
        this.textInput.clear();
        this.setState({ input: '' });
        this.props.setValue(this.props.name, '');
    }
    
    updateValue = input => {
        this.props.setValue(this.props.name, input);
        this.setState({ input });
    }

    render() {
        return ( 
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        placeholder={this.props.placeholder}
                        style={[styles.inputText, { width: this.props.width - 40 }]}
                        onChangeText={this.updateValue}
                        value={this.state.input}
                        autoCapitalize='none'
                        autoCompleteType='off'
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        textAlign={this.props.textAlign ? this.props.textAlign : 'left'}
                        returnKeyType="search"
                        ref={input => { this.textInput = input }}
                    />
                    <View style={styles.deleteBtnWrapper}>
                        {this.state.input.length > 0 ?
                            <TouchableOpacity 
                                style={styles.deleteBtn}
                                onPress={this.clearSearch}
                            >
                                <Icon
                                    name='close-circle'
                                    size={20}
                                    color='silver'
                                />
                            </TouchableOpacity> : null
                        }
                    </View>
                    
                </View>
            </View>
        );
    }
}