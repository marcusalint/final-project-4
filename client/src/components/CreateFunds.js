import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'

import FormProducts from './FormProducts';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import FormList from './FormList';
import Modal from 'react-modal';
import "./Form.css";

Modal.setAppElement('div')

export default function CreateFundPage(props) {
  const [productButton, setProductButton] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const [campaignId, setCampaignId] = useState(0)
  const [state, setState] = useState(
    { profile_title: "",
      profile_description: "",
      image: "",
      total_goal: "",
      products :[]
    })

  function save(stateReceived){
    const newCategories = stateReceived.categories;
    const newTitle = stateReceived.product_title;
    const newDescription = stateReceived.description;
    const newPrice = stateReceived.price;
    let temp = [...state.products];
    const newProduct = {
      categories: newCategories, 
      product_title: newTitle, 
      description: newDescription, 
      price: newPrice};
      
      temp.push(newProduct);
      console.log(temp);
    // setState({...state, categories:newCategories,product_title:newTitle,description:newDescription,price:newPrice}); 
    setProductButton(false)
    setState(prev => ({ ...prev, products: temp}));
    console.log(state)
    
  }   
                                      
  function changeHandler(e) {
    setState({...state, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    console.log('Do something after counter has changed', campaignId);
    if(campaignId > 0){
    setRedirect(true);
    }  
  }, [campaignId]);
 
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:3000/api/creatorProfileUpdate', {state})
      .then(response => {
        const id_value = response.data.rows[0].id;
        setCampaignId(id_value)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="form-style-5">
      <form >
    
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="profile_title" placeholder="Enter a title" as="input" onChange = {changeHandler} 
        defaultValue="Forest Fire Destroyed My Home" autoComplete='off'/>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="profile_description" placeholder="Enter a Description" onChange = {changeHandler} as="textarea" rows={3} size="sm"
        defaultValue="Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag. Brunch raclette vexillologist post-ironic glossier ennui" autoComplete='off'/>
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" name="image" defaultValue="https://images.pexels.com/photos/417070/pexels-photo-417070.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" placeholder="Enter a Category" onChange = {changeHandler} autoComplete='off'/>
        <Form.Label>Total Goal</Form.Label>
        <Form.Control type="text" name ="total_goal" placeholder="Enter new Category" as="input" defaultValue="20000" onChange = {changeHandler} autoComplete='off'/>


      </form>
      {state.products.map(item =>  {
        return (
          <table>
            <tbody>
              <FormList 
              product_title={item.product_title}
              description={item.description}
              categories={item.categories}
              price={item.price}/>
            </tbody>
          </table>
        )
      })}
      <button className="btn-add"onClick={(e) => setProductButton(true)}>Add Product</button>
      <Modal isOpen={productButton} onRequestClose={() => setProductButton(false)}>
        <FormProducts onSave={save}/>
        <button className="btn-cancel" onClick={() =>setProductButton(false)}>Cancel</button>
      </Modal>
      <button className='btn-save' onClick ={handleSubmit} variant="primary" type="submit">
          Save
      </button>
      { redirect && <Redirect to={{
              pathname: '/campaign',
              state: {
                id: campaignId
              }
            }}/>}
    </div>
  )
}
