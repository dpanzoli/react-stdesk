import React from 'react';
import Task from './Task';
import './TaskList.css';
import { Button, Menu, Checkbox } from 'semantic-ui-react'

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
				<div className="ui active center inline large text loader">Chargement des tâches</div>
			);
		} else {
			return (
				<React.Fragment>
				<div id="operations" className="ui form">
				  <div className="inline fields">
					<label>Afficher uniquement</label>
					<div className="field">
					  <div className="ui radio checkbox">
						<input type="radio" name="filterTasks" checked="checked" />
						<label>Toutes</label>
					  </div>
					</div>
					<div className="field">
					  <div className="ui radio checkbox">
						<input type="radio" name="filterTasks" />
						<label>Passées et urgentes</label>
					  </div>
					</div>
					<div className="field">
					  <div className="ui radio checkbox">
						<input type="radio" name="filterTasks" />
						<label>Sans date</label>
					  </div>
					</div>
				  </div>
				</div>
				
				
				
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
				
				</React.Fragment>
			);
		}
	}
}
	
export default TaskList;

