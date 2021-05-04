import React, { useState, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios';

import 'moment/locale/fr';
import './TaskDetails.css';

function TaskDetails(props) {

	const [data, setData] = useState({ 
		comments: [],  
		clickAnywhere: function(e) {
			e.stopPropagation();	
		}
	});
	const [url, setUrl] = useState('/allComments',);
	
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(url);
			setData(result.data);
		};
		fetchData();
	}, [url]);
	
	console.log(props);
	
	
	return (
		<button type="button" onClick={ () => setUrl(`/allComments?idTask=${props.id}`)} >Reload</button> 
	);
	
	/*
	if (props.id === -1) return ( <div></div> );
	return (
		<div id='taskdetails' className="ui piled segment" onClick={data.clickAnywhere}>
			<h4>Détails de la tâche {props.id} </h4>
			<div className="ui progress">
				<div className="bar">
					<div className="progress"></div>
				</div>
				<div className="label">1/10 complété(s)</div>
			</div>
			<div className="ui divided items">
			{
				data.comments.map((item) => 
					<Comment key={item.id} commentData={item} />
				)
			}
			</div>
			<div>
			<button className="ui labeled icon button">
				<i className="add icon"></i>
				Commenter
			</button>
			</div>
		</div>
	);*/
}

function Comment(props) {

	const [data, setData] = useState({  showControls: true });

	return <h1>Commentaire</h1>;
/*
	return (
		<div className="item">
			<div className="content">
				<div className="ui checkbox">
					<input type="checkbox" name="example" />
					<label>{props.commentData.is_subtask}</label>
				</div>
				<div>
					{props.commentData.comment}
				</div>
				<div className="extra">
					Le {moment(props.commentData.date).format('Do MMMM YYYY')}
					par {props.commentData.user}
					<span className={`control ${data.showControls?'shown':''}`} >
						&nbsp;&mdash;&nbsp;					
							<button className="ui compact basic primary mini icon button">
							<i className="edit icon"></i>
							Modifier
						</button>
						<button className="ui compact basic primary mini icon button">
							<i className="delete icon"></i>
							Supprimer
						</button>
					</span>
				</div>
			</div>
		</div>
	);
*/
}

export default TaskDetails;

