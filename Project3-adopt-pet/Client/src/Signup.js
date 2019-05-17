import React, { Component } from "react";
import { Button, Form} from 'semantic-ui-react';
import axios from "axios";
import {NavLink, Redirect} from 'react-router-dom'
// import { Message } from 'semantic-ui-react';
import ModalExample from './ModalExample';



class Signup extends Component {
   constructor(props) {
     super(props)
     this.state = {
       fullName:"",
       email:"",
       originalPassword:"",
       message: null,
     }
   }

genericSync(event){
  const { name, value } = event.target;
  this.setState ({ [name]: value });
}

handleSubmit(event) {
  event.preventDefault();
  axios.post(
    'http://localhost:3001/api/signup',
    // `${process.env.REACT_APP_API_URL}/api/signup`,
    this.state,
    { withCredentials: true }, // FORCE axios to send cookies across domains
)
    .then(responseFromServer => {
      console.log("Signup Page", responseFromServer);
      const { userDoc } = responseFromServer.data;
      //send "userDoc" to the App.js function that changeS "currentUser"
      this.props.onUserChange(userDoc);
    })
    .catch(err => {
      if (err.response && err.response.data){
        // console.error("API response", err.response.data)
        return this.setState({ message: err.response.data.message })
      }
    })
}
   render(){
    const {currentUser} = this.props
    if(currentUser){
      return <Redirect to='/' />
  }
    return(
      
      <Form size="large" onSubmit={event => this.handleSubmit(event)}>
      <Form.Group width="equal">
      <div>
         
          <ModalExample />
      </div>
      <Form.Input 
            value={this.state.fullName}
            onChange={event => this.genericSync(event)}
            name="fullName" 
            // fluid
            icon="user"
            iconPosition="left"
            placeholder="Full Name"
            label="Full Name" 
          />
        <Form.Input 
            value={this.state.email}
            onChange={event => this.genericSync(event)}
            name="email" 
            // fluid
            icon="user"
            iconPosition="left"
            placeholder="Email address"
            label="Email Address" 
          />
        <Form.Input 
            value={this.state.originalPassword}
            onChange={event => this.genericSync(event)}
            name="originalPassword" 
            // fluid
            icon="lock"
            iconPosition="left"
            label="Password" 
            placeholder="Password" 
            type="password"/>
      </Form.Group>
      {/* <Form.Button>Submit</Form.Button> */}
      <Button color="blue" fluid size="large">Sign Up</Button>
  
    </Form>
    )
    
   }
};

export default Signup;