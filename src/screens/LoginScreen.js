import React from 'react';
import { View, Image } from "react-native";
import { Text, Button, Icon } from "native-base";
import { connect } from "react-redux";

import { startAuthorize } from '../actions/AuthAction';

import ErrorMessage from "../components/ErrorMessage";
import logo from '../assets/images/logo.png';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { is_logingin, token, login_error, navigation } = this.props;

        console.log('Token', token);
        if (token !== '' && token !== undefined) {
            navigation.replace('Home', { token: token });
        }

        return (
            <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={ logo } style={{ width: 150, height: 50 }}/>

                { is_logingin ? (
                    <View style={{ marginTop: 20 }}>
                        <Text>Signing In ...</Text>
                    </View>
                ) : (
                    <View>
                        { login_error !== '' ? (
                            <ErrorMessage message={ login_error }/>
                        ) : (
                            <Button dark style={{ marginTop: 50 }}
                                    onPress={() => this.props.startAuthorize()}>
                                <Text>Login with Github</Text>
                            </Button>
                        )}
                    </View>
                )}
            </View>
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
