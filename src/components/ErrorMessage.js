import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

export default class ErrorMessage extends React.Component {
    render() {
        const { message } = this.props;

        return (
            <View style={{ marginTop: 25, marginBottom: 25 }}>
                <Text style={{ color: '#c92b16' }}>{ message }</Text>
            </View>
        );
    }
}
