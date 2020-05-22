let initialState = {
    loading: true,
    load_more: false,
    current_page: 0,
    next_page: 0,
    repos: [],
    error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;

    switch (action.type) {
        case 'SEARCH_REPO':
            return {
                ...state,
                loading: state.current_page === 0,
                load_more: state.current_page > 0
            };
        case 'SEARCH_REPO_SUCCESS':
            const { items, current_page, next_page } = result;
            let data = [];
            if (current_page === 1) {
                data = items;
            } else {
                data = state.repos.concat(items);
            }

            return {
                ...state,
                loading: false,
                load_more: false,
                current_page: current_page,
                next_page: next_page,
                repos: data,
            };
        case 'SEARCH_REPO_ERROR':
            return {
                ...state,
                loading: false,
                error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
