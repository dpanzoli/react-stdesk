import React from 'react';
import TaskList from "./TaskList";
import './App.css';

class App extends React.Component {

	render() {
		return (
			<React.Fragment>
				<h1>ST desk</h1>
				<TaskList />
			</React.Fragment>
		);
	}
}
	
export default App;

