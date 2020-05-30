import React from "react";
import styled from "styled-components";
import {View} from "react-native";
import {Text} from "native-base";

const Message = styled(View)`
    display: flex;
    align-items: center;
`;

export default class EmptyMessage extends React.Component {
    render() {
        const { message } = this.props;

        return (
            <Message>
                <Text>{ message }</Text>
            </Message>
        );
    }
}
