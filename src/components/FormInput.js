import React from "react";
import styled from "styled-components";
import {View} from "react-native";

const Input = styled(View)`
    margin: 15px;
    padding: 5px;
`;

export default class FormInput extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <Input>
                {children}
            </Input>
        );
    }
}
