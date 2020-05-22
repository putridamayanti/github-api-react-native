import React from 'react';
import { View } from 'react-native';
import {Body, Button, Card, Icon, Left, List, ListItem, Right, Text, Thumbnail,
    Grid, Row, Col } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ListRepo extends React.Component {
    render() {
        const { items, navigation } = this.props;

        return (
            <List style={{ padding: 20, paddingTop: 10 }}>
                { items.map((item, key) => {
                    return (
                        <Card style={{ padding: 15 }} key={key}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Thumbnail square source={{ uri: item.owner.avatar_url }} />

                                <View style={{ width: 180 }}>
                                    <Text>{ item.name }</Text>
                                    <Text note numberOfLines={1}>
                                        { item.description }
                                    </Text>
                                </View>

                                <Button transparent
                                        onPress={() => navigation.navigate('Detail', { repo: item.full_name})}>
                                    <Icon name='eye' style={{ color: '#8a8888'}} />
                                </Button>
                            </View>
                        </Card>
                    );
                })}
            </List>
        );
    }
}
