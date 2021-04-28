import React from 'react';
import './Task.css';

class Task extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			overdue: false
		};
	}
	
	componentDidMount() {
		
	}
	
	render() {
		return (
			<div className="item">
				<img className="ui avatar image" src="task.png"></img>
				<div className="content">
					<a className="header">{this.props.description}</a>
					<div className="description">{this.props.date}</div>
				</div>
			</div>
		);
	}
}
	
export default Task;

