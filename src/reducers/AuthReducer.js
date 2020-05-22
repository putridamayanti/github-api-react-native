let initialState = {
    loading: true,
    token: '',
    error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;

    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...state,
                loading: true,
                token: result
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                loading: false,
                error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
