import React from 'react';
import Task from './Task';
import './TaskList.css';

class TaskList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
		};
	}
	
	componentDidMount() {
		fetch('/allTasks')
		.then( res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		);
	}
	
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return (
				<div className="ui negative message">
					<div className="header">
						Chargement des tâches depuis la base de données
					</div>
					<p>Le serveur a renvoyé une erreur</p>
				</div>
			);
		} else if (!isLoaded) {
			return (
				<div id="loading">Chargement des données</div>
			);
		} else {
			return (
				<div id='tasklist' className="ui items">
				{ 
					Object.entries(items).map( ([k, v]) =>  
						<Task 
							key={k}
							id={k}
							titre={v.title}
							date={v.date}
							categories={v.categories}
							complete={v.complete}
							taskHasChanged={this.props.taskHasChanged}
							selected={this.props.selectedTask===k}
						/>
					)
				}
				</div>
			);
		}
	}
}
	
export default TaskList;

