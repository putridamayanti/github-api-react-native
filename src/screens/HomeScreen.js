import React from 'react';
import {  View, ScrollView } from "react-native";
import { Header, Title, Text, Button, Icon, Container, Content, List, ListItem,
    Item, Input, Left, Body, Right, Thumbnail, Spinner } from "native-base";
import {Keyboard} from 'react-native'
import {connect} from "react-redux";

import { logout } from "../actions/AuthAction";
import { searchRepo } from "../actions/RepositoryAction";

import AppBar from "../components/AppBar";
import ListRepo from "../components/ListRepo";

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            contentOffsetY: 0,
            reponame: 'react-native',
            logout: false
        }
    }

    componentDidMount(): void {
        this.searchRepo();
    }

    _onScroll(e){
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
        const bottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;
        if (bottom) {
            this.loadMore();
        }
    }

    searchRepo() {
        Keyboard.dismiss();
        this.props.searchRepo(this.state.reponame, 1);
    }

    loadMore() {
        this.props.searchRepo(this.state.reponame, this.props.next_page);
    }

    logout() {
        this.props.logout(this.props.route.params.token);
        this.props.navigation.replace('Login');
    }

    renderLists(items) {
        if (items.length === 0) {
            return (
                <View>
                    <Text>No Result Found</Text>
                </View>
            )
        } else {
            return (
                <ListRepo items={items} navigation={this.props.navigation}/>
            )
        }
    }

    render() {
        const { repos, loading, load_more, navigation } = this.props;

        return (
            <Container>
                <AppBar title="Home" onPress={() => this.logout()}/>
                <View style={{ margin: 15, padding: 5 }}>
                    <Item>
                        <Input placeholder='Enter repo name eg.react-native'
                               value={ this.state.reponame }
                            onChangeText={(value) => {
                                this.setState((state) => {
                                    return {
                                        reponame: value
                                    }
                                })
                            }}
                        />
                        <Button iconLeft transparent onPress={() => this.searchRepo()}>
                            <Icon name='search' />
                        </Button>
                    </Item>
                </View>

                { loading ? <Spinner color='#3d3d3d' /> : <></>}

                { !loading ? <>
                    { repos !== '' && repos !== undefined ? (
                        <ScrollView onScroll={(e) => this._onScroll(e)}>
                            <ListRepo items={repos} navigation={navigation}/>
                            { load_more ? <Spinner color='#3d3d3d' /> : <></> }
                        </ScrollView>
                    ) : <Text>No Result Found</Text>}
                </> : <></>}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading         : state.repoStore.loading,
        load_more       : state.repoStore.load_more,
        next_page       : state.repoStore.next_page,
        repos           : state.repoStore.repos,
        error           : state.repoStore.error,

        token               : state.authStore.token,
        logout_success      : state.authStore.logout_success
    }
}

export default connect(mapStateToProps, { searchRepo, logout })(HomeScreen);
