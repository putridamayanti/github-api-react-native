import { BASE_URL } from "../constants/Api";

export function searchRepo(name, sort = 'stars') {
    const url = BASE_URL + '/search/repositories?' +
        'q='+ name +'&' +
        'sort='+ sort +'&order=desc';

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
                // console.log(items);
                dispatch({
                    type: 'SEARCH_REPO_SUCCESS',
                    payload: items,
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

export function searchCommit(repo) {
    const url = BASE_URL + '/repos/' + repo + '/commits';
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
                    payload: json,
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
