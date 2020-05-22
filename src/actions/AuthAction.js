import { authorize, revoke } from 'react-native-app-auth';

const REDIRECT_URL = 'com.githubapi://my-host/';

const githubConfig = {
    id: 'e102ac136f9a21004cc3', // Your github id application
    secret: '710a2a5b60b073622501412e8f085af814ea0173' // Your github secret application
};

export function startAuthorize() {
    return async dispatch => {
        dispatch({
            type: 'SIGNIN',
        });

        const config = {
            redirectUrl: REDIRECT_URL,
            clientId: githubConfig.id,
            clientSecret: githubConfig.secret,
            scopes: ['identity'],
            serviceConfiguration: {
                authorizationEndpoint: 'https://github.com/login/oauth/authorize',
                tokenEndpoint: 'https://github.com/login/oauth/access_token',
                revocationEndpoint:
                    'https://github.com/settings/connections/applications/'+githubConfig.id
            }
        };

        const authState = await authorize(config);

        if (authState.accessToken) {
            dispatch({
                type: 'SIGNIN_SUCCESS',
                payload: authState.accessToken,
            });
        } else {
            dispatch({
                type: 'SIGNIN_ERROR',
            });
        }
    }
}

export function logout(token) {
    return async dispatch => {
        dispatch({
            type: 'SIGNOUT',
        });

        const config = {
            clientId: githubConfig.id,
            redirectUrl: REDIRECT_URL,
            scopes: ['identity'],
            serviceConfiguration: {
                revocationEndpoint:
                    'https://github.com/settings/connections/applications/'+githubConfig.id
            }
        };

        const result = await revoke(config, {
            tokenToRevoke: token,
            includeBasicAuth: true,
            sendClientId: true,
        });

        dispatch({
            type: 'SIGNOUT_SUCCESS',
        });
    };
}
