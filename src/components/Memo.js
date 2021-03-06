import React from 'react';
import TimeAgo from 'react-timeago'

class Memo extends React.Component {

	componentDidUpdate() {
		$(`#dropdown-button-${this.props.data._id}`).dropdown({
			belowOrigin: true
		});
	}

	componentDidMount() {
		$(`#dropdown-button-${this.props.data._id}`).dropdown({
			belowOrigin: true
		});
	}

	render() {

		let { data, ownership } = this.props;

		const dropDownMenu = ( 
			<div className="option-button">
                <a className='dropdown-button' 
                	id={`dropdown-button-${data._id}`}
                	data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
		);

		const memoView = ( 
			<div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );

		return (
			<div className="container memo">
                { memoView }
            </div>
		);
	}
}

Memo.propTypes = {
	data: React.PropTypes.object,
	ownership: React.PropTypes.bool
};

Memo.defaultProps = {
	data: {
		_id: 'test1234',
		writer: 'Tester',
		contents: 'This is Contents',
		is_edited: false,
		date: {
			create: new Date(),
			edited: new Date()
		},
		starred: []
	},
	ownership: true
}

export default Memo;