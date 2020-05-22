import React from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Text,
    Thumbnail
} from "native-base";
import moment from "moment";
import {connect} from "react-redux";
import { searchCommit } from "../actions/RepositoryAction";
import {View} from "react-native";

class DetailScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            repo: this.props.route.params.repo
        }
    }

    componentDidMount(): void {
        this.props.searchCommit(this.state.repo);
    }

    render() {
        const { commits, loading_commit } = this.props;

        if (loading_commit) {
            return (
                <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='blue' />
                </View>
            );
        }

        return (
            <Container>
                <Content>
                    <List>
                        { commits.map((item, key) => {
                            const date_formatted = moment(item.commit.committer.date).format('MMMM Do YYYY, h:mm:ss a');
                            const time = moment(date_formatted, '\'MMMM Do YYYY, h:mm:ss a\'').fromNow();
                            console.log(date_formatted, time);
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
                                            <Text style={{ fontWeight: '600' }}>{ item.commit.author.name }</Text> authored and <Text style={{ fontWeight: '600' }}>{ item.commit.committer.name}</Text> committed
                                        </Text>
                                    </Body>
                                    {/*<Right>*/}
                                    {/*    <Button transparent>*/}
                                    {/*        <Icon name='home' />*/}
                                    {/*    </Button>*/}
                                    {/*</Right>*/}
                                </ListItem>
                            );
                        })}
                    </List>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        commits     : state.repoStore.commits,
        loading     : state.repoStore.loading,
        error       : state.repoStore.error
    }
}

export default connect(mapStateToProps, { searchCommit })(DetailScreen);
