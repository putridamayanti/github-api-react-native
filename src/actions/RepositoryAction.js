import { BASE_URL } from "../constants/Api";

export function searchRepo(name, page) {
    const url = BASE_URL + '/search/repositories?' +
        'q='+ name + '&' +
        'sort=stars&order=desc&' +
        'page=' + page;

    return async dispatch => {
        dispatch({
            type: 'SEARCH_REPO',
        });
        fetch(url)
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                }
            })
            .then(json => {
                const items = json.items;

                dispatch({
                    type: 'SEARCH_REPO_SUCCESS',
                    payload: {
                        items: items,
                        current_page: page,
                        next_page: page + 1
                    },
                })
            })
            .catch((error) => {
                console.log('Error', error);
                dispatch({
                    type: 'SEARCH_REPO_ERROR',
                    payload: error
                })
            })
    }
}

export function searchCommit(repo, page) {
    const url = BASE_URL + '/repos/' + repo + '/commits?page=' + page;
    console.log(url);
    return async dispatch => {
        dispatch({
            type: 'SEARCH_COMMIT',
        });
        fetch(url)
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                }
            })
            .then(json => {
                dispatch({
                    type: 'SEARCH_COMMIT_SUCCESS',
                    payload: {
                        items: json,
                        current_page: page,
                        next_page: page + 1
                    },
                })
            })
            .catch((error) => {
                console.log('Error', error);
                dispatch({
                    type: 'SEARCH_COMMIT_ERROR',
                    payload: error
                })
            })
    }
}
