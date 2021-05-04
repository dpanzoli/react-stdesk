import React, { useState, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios';
import { Progress, Checkbox } from 'semantic-ui-react'

import 'moment/locale/fr';
import './TaskDetails.css';

function TaskDetails(props) {

	const [comments, setComments] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [completion, setCompletion] = useState(25);

	useEffect(() => {
		setComments([]);
		setIsLoading(true);
		axios.get(`/allComments?idTask=${props.id}`)
		.then((response) => {
			setComments(response.data);
			setIsLoading(false);
		})
		.catch(error => console.log(`Erreur : ${error}`));
		
	}, [props.id]);

	if (props.id === -1) return ( <div></div> );
	return (
		<div id='taskdetails' className="ui piled segment" onClick={(e) => e.stopPropagation()}>
			<h4>Détails de la tâche {props.id} </h4>
			<Progress percent={completion} color='teal' label={`${completion}% completed`} />
			{
				isLoading?
				<div className="ui active center inline loader"></div>:
				<CommentList comments={comments}/>
			}
			<div>
			<button className="ui labeled icon button">
				<i className="add icon"></i>
				Commenter
			</button>
			</div>
		</div>
	);
}

function CommentList(props) {
	return(
		<div className="ui divided items">
		{
			props.comments.map((item) => 
				<Comment key={item.id} commentData={item} />
			)
		}
		</div>
	);
}

function Comment(props) {

	const [data, setData] = useState({  showControls: true });

	let cb = '';
	if (props.commentData.is_subtask) {
		if (props.commentData.is_completed) {
			cb = <Checkbox defaultChecked />;
		} else {
			cb = <Checkbox />;
		}
	}

	return (
		<div className="item">
			<div className="content">
				{ cb}	
				<div>
					{props.commentData.comment}
				</div>
				<div className="extra">
					Le {moment(props.commentData.date).format('Do MMMM YYYY')}
					par {props.commentData.user}
					<span className={`control ${data.showControls?'shown':''}`} >
						&nbsp;&mdash;&nbsp;					
							<button className="ui compact basic mini icon button">
							<i className="edit icon"></i>
							Modifier
						</button>
						<button className="ui compact basic mini icon button">
							<i className="delete icon"></i>
							Supprimer
						</button>
					</span>
				</div>
			</div>
		</div>
	);
}

function Completion(props) {
	return (
		<div className="ui progress">
			<div className="bar">
				<div className="progress"></div>
			</div>
			<div className="label">1/10 complété(s)</div>
		</div>
	);
}

export default TaskDetails;

