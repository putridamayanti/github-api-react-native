import React from 'react';
import { View } from 'react-native';
import styled from "styled-components";
import { Button, Card, Icon, List, Text, Thumbnail } from 'native-base';

const ListView = styled(View)`
    padding: 10px 20px;
`;

const CardView = styled(View)`
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CardContent = styled(View)`
    width: 180px;
`;

const IconEye = styled(Icon)`
    color: #8a8888;
`;

export default class ListRepo extends React.Component {
    render() {
        const { items, navigation } = this.props;

        return (
            <ListView>
                { items.map((item, key) => {
                    return (
                        <Card key={key}>
                            <CardView>
                                <Thumbnail square source={{ uri: item.owner.avatar_url }} />

                                <CardContent>
                                    <Text>{ item.name }</Text>
                                    <Text note numberOfLines={1}>
                                        { item.description }
                                    </Text>
                                </CardContent>

                                <Button transparent
                                        onPress={() => navigation.navigate('Detail', { repo: item.full_name})}>
                                    <IconEye name='eye' />
                                </Button>
                            </CardView>
                        </Card>
                    );
                })}
            </ListView>
        );
    }
}
