import React from 'react';
import { View } from "react-native";
import { Text } from "native-base";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        console.log('a');
    }

    render() {
        return (
            <View>
                <Text>
                    Login Screen
                </Text>
            </View>
        );
    }
}
