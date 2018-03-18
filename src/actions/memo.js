import axios from 'axios';
import {
	MEMO_POST,
	MEMO_POST_SUCCESS,
	MEMO_POST_FAILURE,
	MEMO_LIST,
	MEMO_LIST_SUCCESS,
	MEMO_LIST_FAILURE
} from './ActionTypes';

/* MEMO_POST */
export function memoPostRequest( contents ) {
	return dispatch => {
		dispatch(memoPost());

		return axios.post('/api/memo/', { contents })
		.then(res => {
			dispatch(memoPostSuccess());
		}).catch(err => {
			dispatch(memoPostFailure(err.response.data.code));
		});
	};
}

export function memoPost() {
	return {
		type: MEMO_POST
	};
}

export function memoPostSuccess() {
	return {
		type: MEMO_POST_SUCCESS
	};
}

export function memoPostFailure(err) {
	return {
		type: MEMO_POST_FAILURE,
		err
	}
}
/* MEMO_LIST */
export function memoListRequest( isInitial, listType, id, username ) {
	console.log('debug');
	
	return dispatch => {
		dispatch(memoList());

		let url = '/api/memo';

		if (typeof username === "undefined") {
			url = isInitial ? url : `${url}/${listType}/${id}`;
		} else {
			// to be continued
		}

		return axios.get(url)
		.then(res => {
			dispatch(memoListSuccess(res.data, isInitial, listType));
		}).catch(err => {
			dispatch(memoListFailure());
		});
	};
}

export function memoList() {
	return {
		type: MEMO_LIST
	};
}

export function memoListSuccess(data, isInitial, listType) {
	return {
		type: MEMO_LIST_SUCCESS,
		data,
		isInitial,
		listType
	};
}

export function memoListFailure() {
	return {
		type: MEMO_LIST_FAILURE,
	}
}