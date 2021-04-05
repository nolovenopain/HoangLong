import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./css";

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWithDots: this.props.oldValue ? (this.props.oldValue.length > this.props.length &&  !this.props.multiline ? this.props.oldValue.substr(0,this.props.length) + '...' : this.props.oldValue) : '',
            showPass: this.props.hideshowText,
            close: false,
            isFocused: false,
            input: this.props.oldValue ? this.props.oldValue : ''
        };
    }

    componentDidMount() { 
        this.props.onRef ? this.props.onRef(this) : null
    }
    
    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    showPass() {
        this.setState({
            showPass: !this.state.showPass
        })
    }

    handleFocus = () => 
        this.setState({ 
            isFocused: true, 
            inputWithDots: this.state.input
        });

    handleBlur = () =>  
        this.setState({ 
            isFocused: false,
            inputWithDots: this.state.input.length > this.props.length && !this.props.multiline ? this.state.input.substr(0,this.props.length) + '...' : this.state.input 
        });
    
    clearOldInput = () => {
        this.textInput.clear();
        this.setState({ 
            inputWithDots: '', 
            input: '' 
        });
        this.props.setValue(this.props.name, '');
    }
    
    updateValue = input => {
        this.props.setValue(this.props.name, input);
        this.setState({ 
            input, 
            inputWithDots: input
        });
    }

    render() {
        return ( 
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        placeholder={this.props.placeholder ? this.props.placeholder : ''}
                        style={
                            [
                                styles.inputText, 
                                this.props.multiline ? null : { height: 35 }, 
                                this.props.fontSize ? { fontSize: this.props.fontSize } : { fontSize: 14 },
                                { width: this.props.width },
                                this.props.minHeight ? { minHeight: this.props.minHeight } : null
                            ]
                        }
                        secureTextEntry={this.state.showPass}
                        onChangeText={this.updateValue}
                        value={this.state.inputWithDots}
                        autoCapitalize='none'
                        autoCompleteType='off'
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        editable={this.props.editable}
                        multiline={this.props.multiline}
                        textAlignVertical={this.props.minHeight && this.props.multiline ? 'top' : 'center'}
                        keyboardType={this.props.keyboardType}
                        ref={input => { this.textInput = input }}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        textAlign={this.props.textAlign ? this.props.textAlign : 'left'}
                        returnKeyType="next"
                        onSubmitEditing={() => this.props.nextInput ? this.props.nextInput.textInput.focus() : {}}
                    />
                    <View style={[styles.btnGroup, {width: this.props.btnGroupWidth}]}>
                        {(this.state.inputWithDots != '' && 
                            this.state.inputWithDots != null && 
                                this.state.inputWithDots != undefined && 
                                    this.props.editable == true && 
                                        this.props.marginLeft) ? 
                            ( <TouchableOpacity
                                style={[{marginLeft: this.props.marginLeft, marginRight: this.props.marginRight ? this.props.marginRight : 0}, styles.btnDelete]}
                                onPress={() => {
                                    this.setState({ 
                                        inputWithDots: '', 
                                        input: '' 
                                    }),
                                    this.props.setValue(this.props.name, '')
                                }}
                            >
                                <Icon
                                    name='close-circle'
                                    size={20}
                                    color='silver'
                                />
                            </TouchableOpacity> ) : null
                        }
                        {this.props.hideshowText && this.props.hideshowIcon ? 
                            <TouchableOpacity
                                style={styles.btnEye}
                                onPress={() => this.showPass()}
                            >
                                <Icon 
                                    name={this.state.showPass ? 'ios-eye' : 'ios-eye-off'}
                                    size={23}
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