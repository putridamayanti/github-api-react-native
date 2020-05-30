import React from 'react';
import styled from "styled-components";
import { View, Image } from "react-native";
import { Text, Button, Icon } from "native-base";
import { connect } from "react-redux";

import { startAuthorize } from '../actions/AuthAction';

import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

import logo from '../assets/images/logo.png';

const Login = styled(View)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonLogin = styled(Button)`
    margin: 20px 0;
`;

const ImageLogo = styled(Image)`
    width: 150px;
    height: 50px;
`;

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { is_logingin, token, login_error, navigation } = this.props;

        if (token !== '' && token !== undefined) {
            navigation.replace('Home', { token: token });
        }

        return (
            <Login>
                <ImageLogo source={ logo }/>

                { is_logingin ? (
                    <Loading>
                        <Text>Signing In ...</Text>
                    </Loading>
                ) : (
                    <View>
                        { login_error !== '' && (
                            <ErrorMessage message={  login_error }/>
                        )}

                        <ButtonLogin dark onPress={() => this.props.startAuthorize()}>
                            <Text>Login with Github</Text>
                        </ButtonLogin>
                    </View>
                )}
            </Login>
        );
    }
}

function mapStateToProps(state) {
    return {
        token           : state.authStore.token,
        is_logingin     : state.authStore.is_logingin,
        login_error     : state.authStore.login_error
    }
}

export default connect(mapStateToProps, { startAuthorize })(LoginScreen);
