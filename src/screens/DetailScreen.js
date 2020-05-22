import React from 'react';
import {
    Container,
    Spinner,
} from "native-base";
import {connect} from "react-redux";
import { searchCommit } from "../actions/RepositoryAction";
import {View , ScrollView} from "react-native";
import ListCommit from "../components/ListCommit";

class DetailScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            repo: this.props.route.params.repo
        }
    }

    componentDidMount(): void {
        this.props.searchCommit(this.state.repo, 1);
    }

    _onScroll(e){
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
        const bottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;
        if (bottom) {
            this.loadMore();
        }
    }

    loadMore() {
        this.props.searchCommit(this.state.repo, this.props.next_page);
    }

    render() {
        const { commits, loading, load_more } = this.props;
        return (
            <Container>
                { loading ? (
                    <View>
                        <Spinner color='#3d3d3d' />
                    </View>
                ) : <></>}
                { !loading && (
                    <ScrollView onScroll={(e) => this._onScroll(e)}>
                        <ListCommit items={commits}/>
                        { load_more ? <Spinner color='#3d3d3d' /> : <></> }
                    </ScrollView>
                )}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading         : state.commitStore.loading,
        load_more       : state.commitStore.load_more,
        next_page       : state.commitStore.next_page,
        commits         : state.commitStore.commits,
        error           : state.commitStore.error,
    }
}

export default connect(mapStateToProps, { searchCommit })(DetailScreen);
