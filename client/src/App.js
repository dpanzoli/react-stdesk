import React, { Component } from 'react';
import './App.css';

class App extends React.Component {

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
		);
	}
	
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return React.createElement('div', {}, error.message);
		} else if (!isLoaded) {
			return React.createElement('div', {}, 'Loading ...');
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
	
export default App;

