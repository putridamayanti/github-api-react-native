import React from 'react';
import { View, Image } from "react-native";
import { Text, Button, Icon } from "native-base";
import InAppBrowser from 'react-native-inappbrowser-reborn'

import { connect } from "react-redux";

import { startAuthorize } from '../actions/AuthAction';

import logo from '../assets/images/logo.png';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async openAuth() {
        try {
            const url = 'https://www.google.com';
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'overFullScreen',
                    modalTransitionStyle: 'partialCurl',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
            }
        } catch (e) {

        }
    }

    render() {
        const { loading, token, error, navigation } = this.props;

        if (token !== '') {
            navigation.replace('Home', { token: token });
        }
        return (
            <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={ logo } style={{ width: 150, height: 50 }}/>

                <Button dark style={{ marginTop: 50 }}
                        onPress={() => this.props.startAuthorize()}>
                    <Text>Login with Github</Text>
                </Button>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token       : state.authStore.token,
        loading     : state.authStore.loading,
        error       : state.authStore.error
    }
}

export default connect(mapStateToProps, { startAuthorize })(LoginScreen);
