import React from 'react';
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
		/*fetch('/allTasks')
		.then( res => res.json())
		.then(
			(result) => {
				console.log(result);
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
		);*/
	}
	
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return (
				<div class="ui negative message">
					<div class="header">
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
				<ul>
				  {items.map(item => (
					<li key={item.id}>
					  {item.description} {item.date}
					</li>
				  ))}
				</ul>
			);
		}
	}
}
	
export default TaskList;

