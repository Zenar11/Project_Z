import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.handlePost = this.handlePost.bind(this);
		this.loadNewMemo = this.loadNewMemo.bind(this);
	}

	handlePost( contents ) {

		return this.props.memoPostRequest(contents).then(
			() => {
				if (this.props.postStatus.status === 'SUCCESS') {

					// NEW MEMO INIT
					
					this.loadNewMemo().then(
						() => {
							Materialize.toast('Success!', 2000);
						}
					);
				} else {
					/* ERR CODES
							1. NOT LOGGED IN
							2. EMPTY CONTENTS
					*/
					let $toastContent;

					switch(this.props.postStatus.error) {
						case 1:
							$toastContent = $('<span style="color: #FFB4BA">Please Login First</span>');
							Materialize.toast($toastContent, 2000);
							setTimeout(() => {location.reload(false);}, 2000);
							break;
						case 2:
							$toastContent = $('<span style="color: #FFB4BA">Write Something!</span>');
							Materialize.toast($toastContent, 2000);
							break;
						default:
							$toastContent = $('<span style="color: #FFB4BA">Something Wrong</span>');
							Materialize.toast($toastContent, 2000);
							break;
					}
				}
			}
		);
	}

	componentDidMount() {

		const loadMemoLoop = () => {
			this.loadNewMemo().then(
				() => {
					this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
				}
			);
		};

		this.props.memoListRequest(true).then(
			() => {
				console.log(this.props.memoData);
				loadMemoLoop();
			}
		);
	}

	componentWillUnmount() {
		clearTimeout(this.memoLoaderTimeoutId);
	}

	loadNewMemo() {
		if (this.props.listStatus === 'WAITING') {
			return new Promise((res, rej) => {
				res();
			});
		}

		if (this.props.memoData.length === 0) {
			return this.props.memoListRequest(true);
		}

		return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id, this.props.username);
	}

	render() {
		// console.log(this.handlePost);

		const write = (
			<Write onPost={this.handlePost}/>
		);


		// axios come Here


		return (
			<div className="wrapper">
				{ this.props.isLoggedIn ? write : undefined }
				<MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.authentication.status.isLoggedIn,
		postStatus: state.memo.post,
		currentUser: state.authentication.status.currentUser,
		memoData: state.memo.list.data,
		listStatus: state.memo.list.status
	};
};

const mapDispatchToProps = dispatch => {
	return {
		memoPostRequest: contents => {
			return dispatch(memoPostRequest(contents));
		},
		memoListRequest: (isInitial, listType, id, username) => {
			return dispatch(memoListRequest(isInitial, listType, id, username));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);