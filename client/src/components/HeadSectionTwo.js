import React from 'react'
import './HeadSectionTwo.scss'
import MainProgressBar from './progressbar/MainProgressBar';
import { getPercentage } from '../helpers/helpers';




const HeadSectionTwo = ({products, updateProduct, users, profile, goal, state}) => {

  console.log(Object.keys(profile), 'this is the profiel')


  return (
    <div className="Section--Two">
      <h1 className="Title">{profile[0].title}</h1>
      <p className="Description">{profile[0].description}</p>
      <h2 className="Total--Raised">${state.amount_reached.toLocaleString()} Raised of a ${goal.toLocaleString()} Goal</h2>
      <MainProgressBar percentage={getPercentage(state)}/>
      
      <h2 className></h2>
      <h2></h2>
         
      
      
      

  
    </div>
  )
}

export default HeadSectionTwo
