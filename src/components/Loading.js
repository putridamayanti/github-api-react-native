import React from "react";
import styled from "styled-components";
import {View} from "react-native";

const Load = styled(View)`
    margin: 15px 0;
`;

export default class Loading extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <Load>
                { children }
            </Load>
        );
    }
}
