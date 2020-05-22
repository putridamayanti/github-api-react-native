import React from 'react';
import {  View } from "react-native";
import { Text, Button, Icon, Container, Content, List, ListItem,
    Item, Input, Left, Body, Right, Thumbnail, Spinner } from "native-base";
import {connect} from "react-redux";

import { searchRepo } from "../actions/RepositoryAction";

class HomeScreen extends React.Component {

    componentDidMount(): void {
        this.props.searchRepo('react-native');
    }

    render() {
        const { token } = this.props.route.params;
        const { items, loading } = this.props;
        if (loading) {
            return (
                <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home Screen</Text>

                    { loading ? <Spinner color='blue' /> : <></> }
                </View>
            )
        }
        return (
            <Container>
                <View style={{ margin: 15 }}>
                    <Item regular>
                        <Input placeholder='Enter repo name eg.facebook/react-native' />
                    </Item>
                </View>

                { items !== '' && items !== undefined ? (
                    <Content>
                        <List>
                            { items.map((item, key) => {
                                return(
                                    <ListItem thumbnail key={key}>
                                        <Left>
                                            <Thumbnail square source={{ uri: item.owner.avatar_url }} />
                                        </Left>
                                        <Body>
                                            <Text>{ item.name }</Text>
                                            <Text note numberOfLines={1}>
                                                { item.description }
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Button transparent
                                                    onPress={() => this.props.navigation.navigate('Detail', { repo: item.full_name})}>
                                                <Icon name='home' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Content>
                ) : <></>}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        items       : state.repoStore.items,
        loading     : state.repoStore.loading,
        error       : state.repoStore.error
    }
}

export default connect(mapStateToProps, { searchRepo })(HomeScreen);
