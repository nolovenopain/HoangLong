import React, { Component } from 'react';
import { Text, Image, SafeAreaView } from 'react-native';
import { styles } from './css'
import { images } from '../../Constants'

export default class Splash extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                1000
            )
        )
    }

    async componentDidMount() {
        this._isMounted = true
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.props.navigation.replace('BottomNavigation');
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
	}

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.logo}
                    source={images.logo1}
                />
                <Text style={styles.title}>Nơi gửi trọn niềm tin</Text>
            </SafeAreaView>
        );
    }
}
