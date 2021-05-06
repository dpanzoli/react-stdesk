import React from 'react';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';
import './App.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTask: -1
		};
		this.taskHasChanged = this.taskHasChanged.bind(this);
		this.cancelSelection = this.cancelSelection.bind(this);
	}
	
	taskHasChanged(id) {
		this.setState({selectedTask: id});
	}
	
	cancelSelection() {
		this.setState({selectedTask: -1});
	}
	
	render() {
		return (
			<React.Fragment>
				<h1 className="ui header">ST Desk</h1>
				<div className="ui two column grid" onClick={this.cancelSelection}>
					<div className="column">
						<TaskList
							taskHasChanged={this.taskHasChanged}
							selectedTask={this.state.selectedTask}
						/>
					</div>
					<div className="column">
						<TaskDetails 
							id={this.state.selectedTask}
							requestRefresh={this.taskHasChanged}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
	
export default App;

