import React, { Component } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import { styles } from './css'

export default class TermAndPolicy extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
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
                            <Text style={styles.headerTitle}>Điều khoản và dịch vụ</Text>
                        </View>
                        <View style={styles.headerRight}>
                            
                        </View>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}
                    > 
                       <View style={styles.content}>
                            <Text style={styles.title}>Điều khoản dịch vụ</Text>
                            <Text style={styles.wellcome}>
                                Chào mừng bạn đến với Công ty Cổ Phần Đầu tư Xây dựng và Cung ứng Nhân lực Hoàng Long (Hoàng Long CMS)!
                            </Text>
                            <Text style={styles.contentText}>
                                Là một đơn vị danh tiếng trong lĩnh vực xuất khẩu lao động. Trải qua hơn 20 năm xây dựng và phát triển, Hoàng Long CMS đã đạt được những thành tích vô cùng ấn tượng. {'\n'} {'\n'}
                                Những con số ấn tượng: {'\n'} {'\n'}
                                + Hơn 20 năm kinh nghiệm cung ứng nhân lực cho thị trường quốc tế {'\n'} {'\n'}
                                + Hơn 15 quốc gia trên Thế Giới đã tiếp nhận lao động của Hoàng Long {'\n'} {'\n'}

                                Với những thành tích kể trên, chúng tôi luôn lấy chữ TÍN làm đầu, không ngừng nâng cao chất lượng đào tạo và phục vụ khách hàng, coi trọng xây dựng quan hệ hợp tác bền vững, lâu dài, giải quyết hài hòa lợi ích của đối tác và người lao động, Hoàng Long CMS đã trở thành một trong những doanh nghiệp hàng đầu của Việt Nam về chất lượng cung ứng nhân lực cho thị trường trong và ngoài nước.
                            </Text>
                       </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
