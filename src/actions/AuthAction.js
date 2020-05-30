import { GITHUB_ID, GITHUB_SECRET, GITHUB_REDIRECT_URL} from 'react-native-dotenv';
import { authorize, revoke } from 'react-native-app-auth';

export function startAuthorize() {
    return async dispatch => {
        dispatch({
            type: 'SIGNIN',
        });

        const config = {
            redirectUrl: GITHUB_REDIRECT_URL,
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
            scopes: ['identity'],
            serviceConfiguration: {
                authorizationEndpoint: 'https://github.com/login/oauth/authorize',
                tokenEndpoint: 'https://github.com/login/oauth/access_token',
                revocationEndpoint:
                    'https://github.com/settings/connections/applications/' + GITHUB_ID
            }
        };

        return authorize(config)
            .then((result) => {
                if (result.accessToken) {
                    dispatch({
                        type: 'SIGNIN_SUCCESS',
                        payload: result.accessToken,
                    });
                } else {
                    dispatch({
                        type: 'SIGNIN_ERROR',
                    });
                }
            }).catch(error => {
                    dispatch({
                        type: 'SIGNIN_ERROR',
                    });
            });
    }
}

export function logout(token) {
    return dispatch => {
        dispatch({
            type: 'SIGNOUT',
        });

        const config = {
            clientId: GITHUB_ID,
            redirectUrl: GITHUB_REDIRECT_URL,
            scopes: ['identity'],
            serviceConfiguration: {
                revocationEndpoint:
                    'https://github.com/settings/connections/applications/' + GITHUB_ID
            }
        };

        return revoke(config, {
            tokenToRevoke: token,
            sendClientId: true,
        }).then(result => {
            dispatch({
                type: 'SIGNOUT_SUCCESS',
            });
        });
    };
}
