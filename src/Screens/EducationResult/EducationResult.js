import React, { Component } from 'react';
import { Text, SafeAreaView, View, TouchableWithoutFeedback, FlatList } from 'react-native';
import { green } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import { styles } from './css'

export default class EducationResult extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            list: [
                {id: 1, lession: 8, point: 10, mistake: 0},
                {id: 2, lession: 6, point: 6, mistake: 1},
                {id: 3, lession: 5, point: 8, mistake: 0},
            ]
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    goBack = () => {
        goBack()
    }

    renderRow = ({ item, key }) => {
        return (
            <View style={styles.row}>
                <View style={styles.rowTop}>
                    <View style={styles.rowLeft}>
                        <View style={styles.circle}></View>
                    </View>
                    <View style={styles.rowRight}>
                        <Text style={styles.name}>Họ và tên: Suusoft</Text>
                    </View>
                </View>
                <View style={styles.rowBottom}>
                    <View style={styles.rowLeft}>
                                        
                    </View>
                    <View style={styles.rowRight}>
                        <Text style={styles.text}>
                            Mã học viên: <Text style={{ color: green }}>XLLD326748</Text> {'\n'}
                            Học đến bài: {item.lession} {'\n'}
                            Điểm số: {item.point} {'\n'}
                            Lỗi vi phạm: {item.mistake} {'\n'}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableWithoutFeedback onPress={this.goBack}>
                                <Icon
                                    name='chevron-back'
                                    color='#fff'
                                    size={30}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Tra cứu điểm thi</Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <View style={styles.body}>
                       <View style={styles.content}>
                            <FlatList
                                data={this.state.list}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                       </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
