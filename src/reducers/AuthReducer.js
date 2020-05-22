let initialState = {
    is_logingin: false,
    is_logingout: false,
    token: '',
    login_error: '',
    logout_error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;

    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                is_logingin: true,
                token: result
            };
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                is_logingin: false,
                token: result
            };
        case 'SIGNIN_ERROR':
            return {
                ...state,
                is_logingin: false,
                login_error: 'There is something wrong!'
            };
        case 'SIGNOUT':
            return {
                ...state,
                is_logingout: true,
            };
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                is_logingout: false,
                logout_success: true,
                token: ''
            };
        case 'SIGNOUT_ERROR':
            return {
                ...state,
                is_logingout: false,
                logout_error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
