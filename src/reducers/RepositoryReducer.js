let initialState = {
    loading: true,
    loading_commit: true,
    items: [],
    commits: [],
    error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;

    switch (action.type) {
        case 'SEARCH_REPO':
            return {
                ...state,
                loading: true,
            };
        case 'SEARCH_REPO_SUCCESS':
            return {
                ...state,
                loading: false,
                items: result
            };
        case 'SEARCH_REPO_ERROR':
            return {
                ...state,
                loading: false,
                error: 'There is something wrong!'
            };
        case 'SEARCH_COMMIT':
            return {
                ...state,
                loading_commit: true,
            };
        case 'SEARCH_COMMIT_SUCCESS':
            return {
                ...state,
                loading_commit: false,
                commits: result
            };
        case 'SEARCH_COMMIT_ERROR':
            return {
                ...state,
                loading_commit: false,
                error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
