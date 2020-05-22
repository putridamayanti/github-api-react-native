import React from 'react';
import { View } from 'react-native';
import {Body, Button, Header, Right, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class AppBar extends React.Component {
    render() {
        const { title, onPress } = this.props;

        return (
            <Header noLeft style={{ backgroundColor: '#333333'}} androidStatusBarColor="#4a4a4a">
                <Body>
                    <Title>{ title }</Title>
                </Body>
                <Right>
                    <Button transparent onPress={onPress}>
                        <Icon name='sign-out-alt' size={20} color="#fff"/>
                    </Button>
                </Right>
            </Header>
        );
    }
}
