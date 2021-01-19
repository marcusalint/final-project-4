import React from "react";


export default function AllFundsListItem(props) {
  return (
    <li className="fund" key={props.id} >
      <img className="fund__img" 
      src={props.image} 
      alt={props.title}/>
      <p>{props.location}</p>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <span>{props.amount_raised}raise of {props.total_goal}</span>
    </li>
  );
}