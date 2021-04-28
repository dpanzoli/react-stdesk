import React from 'react';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';
import './App.css';

class App extends React.Component {

	render() {
		return (
			<React.Fragment>
				<h1 className="ui header">ST Desk</h1>
				<div className="ui two column grid">
					<div className="column">
						<TaskList />
					</div>
					<div className="column">
						<TaskDetails />
					</div>
				</div>
			</React.Fragment>
		);
	}
}
	
export default App;

