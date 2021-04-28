import React from 'react';
import Task from './Task';
import './TaskList.css';

class TaskList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			what: 'not'
		};
	}
	
	componentDidMount() {
		
	}
	
	render() {
		return (
			<div id='taskdetails' className="ui piled segment" ng-if="selectedTask!=-1">
				<h4>Détail de la tâche</h4>
				<div className="ui progress">
					<div className="bar">
						<div className="progress"></div>
					</div>
					<div className="label">1/10 complété(s)</div>
				</div>
				<div className="ui divided items">
					<div className="item">
						<div className="content">
							<div className="ui checkbox">
								<input type="checkbox" name="example" />
								<label></label>
							</div>
							<div>
								Sous-tâche
							</div>
							<div className="extra">
								Le 1 avril 2021	par D. Panzoli
								<span className="control">
									&nbsp;&mdash;&nbsp;					
									<a><i className="edit icon"></i>Modifier</a>
									<a><i className="delete icon"></i>Supprimer</a>
								</span>
							</div>
						</div>
					</div>
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
	
export default TaskList;

