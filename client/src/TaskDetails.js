import React, { useState, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios';
import { Progress, Checkbox, Button, Form, Loader, Dimmer, Segment, Icon } from 'semantic-ui-react'

import 'moment/locale/fr';
import './TaskDetails.css';

function TaskDetails(props) {

	const [comments, setComments] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [completion, setCompletion] = useState(25);
	const [taskVal, setTaskVal] = useState(4);
	const [taskTotal, setTaskTotal] = useState(5);
	
	const [commenting, setCommenting] = useState('no');
	
	const [newCommentText, setNewCommentText] = useState('');
	const [newCommentSubtask, setNewCommentSubtask] = useState(false);

	useEffect(() => {
		setComments([]);
		setCommenting('no');
		setIsLoading(true);
		axios.get(`/allComments?idTask=${props.id}`)
		.then((response) => {
			setComments(response.data);
			setIsLoading(false);
		})
		.catch(error => console.log(`Erreur : ${error}`));
		
	}, [props.id]);

	/* Indicateur completion*/
	let progIndicator;
	if (taskTotal>0) progIndicator = <Progress value={taskVal} total={taskTotal} progress='ratio' indicating />;

	/* New comment module */
	let newComment;
	if (commenting === 'no') {
		newComment = <Button onClick={() => setCommenting('writing')} >Commenter</Button>;
	} else if (commenting === 'writing' || commenting === 'sending') {
		newComment = <Segment>
					<Dimmer active={commenting=='sending'} inverted>
						<Loader inverted content='Envoi' />
					</Dimmer>
					<Form>
						<Form.TextArea 
							label='Nouveau commentaire'
							placeholder='&Eacute;crivez ici ...' 
							onChange={(e, data) => {
								setNewCommentText(data.value)
							}}
						/>
						<Form.Checkbox 
							label='Ce commentaire est une sous-tâche' 
							onChange={(e, data) => {
								setNewCommentSubtask(data.checked)
							}}
						/>
						<Button onClick={() => setCommenting('sending')}>Enregistrer</Button>
					</Form>
				</Segment>;
	} 
	
	useEffect(() => {
		if (commenting=='sending') {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					idTask: props.id,
					comment: newCommentText,
					isSubtask: newCommentSubtask,
				})
			};
			fetch('/sendComment', requestOptions)
			.then(response => response.json())
			.then(data => {
				props.requestRefresh()
			});
		}
	}, [commenting]);
	
	if (props.id === -1) return ( <div></div> );
	return (
		<div id='taskdetails' className="ui piled segment" onClick={(e) => e.stopPropagation()}>
			<h4>Détails de la tâche {props.id} </h4>
			{
				progIndicator
			}
			{
				isLoading?
				<div className="ui active center inline loader"></div>:
				<CommentList 
					comments={comments} 
					requestRefresh={props.requestRefresh}
				/>
			}
			{
				newComment
			}
		</div>
	);
}

function CommentList(props) {
	return(
		<div className="ui divided items">
		{
			props.comments.map((item) => 
				<Comment 
					key={item.id}
					commentData={item} 
					requestRefresh={props.requestRefresh}
				/>
			)
		}
		</div>
	);
}

function Comment(props) {

	const [data, setData] = useState({  showControls: true });

	let cb = <div>{props.commentData.comment}</div>;
	if (props.commentData.is_subtask) {
		cb = <Checkbox 
			defaultChecked={props.commentData.is_completed}
			label={props.commentData.comment} 
			onClick={ (e) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						idComment: props.commentData.id,
						newChecked: !props.commentData.is_completed
					})
				};
				fetch('/checkComment', requestOptions)
				.then(response => response.json())
				.then(data => {
					console.log('refresh component only');
				});
			}}
		/>;
	}

	return (
		<div className="item">
			<div className="content">
				{ cb}	
				<div className="extra">
					Le {moment(props.commentData.date).format('Do MMMM YYYY')}
					par {props.commentData.user}
					<span className={`control ${data.showControls?'shown':''}`} >
						&nbsp;&mdash;&nbsp;					
						<Button compact basic size='mini' icon>
							<Icon name='edit' />
							Modifier
						</Button>
						<Button compact basic size='mini' icon
							onClick={ (e) => { 
								console.log(props);
								const requestOptions = {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({
										commentId: props.commentData.id
									})
								};
								fetch('/deleteComment', requestOptions)
								.then(response => response.json())
								.then(data => {
									props.requestRefresh()
								});
							}}
						>
							<Icon name='delete' />
							Supprimer
						</Button>
					</span>
				</div>
			</div>
		</div>
	);
}

export default TaskDetails;

