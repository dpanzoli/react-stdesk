import React from 'react';
import Comment from './Comment';
import './TaskDetails.css';

class TaskDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
		this.clickAnywhere = this.clickAnywhere.bind(this);
	}
	
	componentDidMount() {
		//fetch(`/allComments?taskid=${this.props.id}`)
		//Relancer la requête chaque fois que this.props.id est mid à jour
		fetch('/allComments?taskid=0')
		.then( res => res.json())
		.then((result) => {
			this.setState({comments: result});
		});
	}
	
	clickAnywhere(e) {
		e.stopPropagation();
	}
	
	componentDidUpdate() {
/*		fetch(`/allComments?taskid=${this.props.id}`)
		.then( res => res.json())
		.then((result) => {
			this.setState({comments: result});
		});
*/
	}
	
	render() {
		console.log(this.state.comments);
		if (this.props.id === -1) return ( <div></div> );
		return (
			<div id='taskdetails' className="ui piled segment" onClick={this.clickAnywhere}>
				<h4>Détails de la tâche {this.props.id} </h4>
				<div className="ui progress">
					<div className="bar">
						<div className="progress"></div>
					</div>
					<div className="label">1/10 complété(s)</div>
				</div>
				<div className="ui divided items">
				{
					this.state.comments.map((item) => 
						<Comment key={item.id} data={item} />
					)
				}
				</div>
				<div>
				<button className="ui labeled icon button">
					<i className="add icon"></i>
					Commenter
				</button>
				</div>
			</div>
		);
	}
}
	
export default TaskDetails;

