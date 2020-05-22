import React from 'react';
import { View } from 'react-native';
import {
    Body, Button, Icon, Left, List, ListItem, Right, Text,
    Card, CardItem, Thumbnail
} from 'native-base';
import moment from "moment";

export default class ListCommit extends React.Component {
    render() {
        const { items } = this.props;

        return (
            <List>
                { items.map((item, key) => {
                    const date_formatted = moment(item.commit.committer.date).format('MMMM Do YYYY, h:mm:ss a');
                    const time = moment(date_formatted, '\'MMMM Do YYYY, h:mm:ss a\'').fromNow();

                    return(
                        <ListItem thumbnail key={key}>
                            <Left>
                                { item.author !== null ? (
                                    <Thumbnail square source={{ uri: item.author.avatar_url }} />
                                ) : (
                                    <Thumbnail square source={{ uri: item.committer.avatar_url }} />
                                )}
                            </Left>
                            <Body>
                                <Text numberOfLines={1}>{ item.commit.message }</Text>
                                <Text note numberOfLines={2}>
                                    <Text style={{ fontWeight: '600' }}>{ item.commit.author.name }</Text> authored and
                                    <Text > { item.commit.committer.name}</Text> committed at
                                    <Text style={{ fontWeight: '300' }}> { time }</Text>
                                </Text>
                            </Body>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}
