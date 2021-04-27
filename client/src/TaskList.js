import React from 'react';
import Task from './Task';
import './TaskList.css';

class TaskList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
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
				<div className="ui relaxed divided list">
					{items.map(item => (
						<Task key={item.id} description={item.description} date={item.date} />
					))}
				</div>
			);
		}
	}
}
	
export default TaskList;

