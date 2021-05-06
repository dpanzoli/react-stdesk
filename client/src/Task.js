import React from 'react';
import moment from 'moment'
import 'moment/locale/fr'
import './Task.css';
import { Progress } from 'semantic-ui-react'

class Task extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			overdue: true,
		};
		this.selectTask = this.selectTask.bind(this);
	}
	
	componentDidMount() {
	}
	
	// Sélectionner la tâche au clic
	selectTask(e) {
		e.stopPropagation();
		this.props.taskHasChanged(this.props.id);
	}
	
	render() {
		// Icône devant la fiche
		let icon;
		if (!this.props.date) {
			icon = <div className="nodate"></div>;
		} else {
			icon = <div className="caldate">
					<span className="month">
						{moment(this.props.date).format('MMM')}
					</span>
					<span className="day">
						{moment(this.props.date).format('Do')}
					</span>
				</div>;
		}
		// Tâche complète
		let complete;
		if (this.props.complete) {
			complete =	<div className="ui green basic label">
							<i className="check icon"></i>Complété
						</div>;
		}
		// Tâche en retard
		let late;
		if (!this.state.overdue) {
			late =	<div className="ui red basic label">
						<i className="exclamation icon"></i>En retard
					</div>;
		}
		
		// Composition de la vue
		
		return (
			<div className="ui  item" onClick={this.selectTask}>
				{icon}
				<div className="content">
				<div className={`ui segment ${this.props.selected?'blue raised':''}`} >
					<h3 className="header">{this.props.titre}</h3>
					<div className="description">
						<p></p>
					</div>
					<div className="extra">
						<div className="ui tag labels">
							{this.props.categories.map(item => (
								<span key={item.id} className="ui label">
									{item.lib}
								</span>
							))}
						</div>
						{ complete }
						{ late }
					</div>
					<Progress attached='bottom' value={2} total={5} indicating />
					
				</div>
				</div>
			</div>
		);
	}
	
	
}
	
export default Task;

