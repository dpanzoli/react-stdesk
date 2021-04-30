import React from 'react';
import './Comment.css';
import moment from 'moment'
import 'moment/locale/fr';

class Comment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			what: 'not',
			showControls: false
		};
		this.controlsOn = this.controlsOn.bind(this);
		this.controlsOff = this.controlsOff.bind(this);
	}
	
	controlsOn() {
		console.log("show controls");
		this.setState({showControls: true});
	}
	
	controlsOff() {
		console.log("hide controls");
		this.setState({showControls: false});
	}
	
	render() {
		return (
			<div className="item">
				<div className="content" onMouseEnter={this.controlsOn} onMouseLeave={this.controlsOff}>
					<div className="ui checkbox">
						<input type="checkbox" name="example" />
						<label>{this.props.data.is_subtask}</label>
					</div>
					<div>
						{this.props.data.comment}
					</div>
					<div className="extra">
						Le {moment(this.props.data.date).format('Do MMMM YYYY')}
						par {this.props.data.user}
						<span className={`control ${this.state.showControls?'shown':''}`} >
							&nbsp;&mdash;&nbsp;					
								<button className="ui compact basic primary mini icon button">
								<i className="edit icon"></i>
								Modifier
							</button>
							<button className="ui compact basic primary mini icon button">
								<i className="delete icon"></i>
								Supprimer
							</button>
						</span>
					</div>
				</div>
			</div>
		);
	}
}
	
export default Comment;

