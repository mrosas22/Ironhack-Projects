import React from 'react';
import { Button, Form} from 'semantic-ui-react';
import axios from "axios";
import {NavLink, Redirect} from 'react-router-dom'
// import { Message } from 'semantic-ui-react';
import ModalExample from './ModalExample';



class Login extends Component {
   constructor(props) {
     super(props)
     this.state = {
       email:"",
       originalPassword:"",
       message: null,
     }
   }
   render(){
    <Form>
    <Form.Group width="equal">
    <div>
       
        <ModalExample />
    </div>
    
      <Form.Input label="Email Address" placeholder="Email Address" />
      <Form.Input label="Password" placeholder="Password" type="password"/>
    </Form.Group>
    {/* <Form.Button>Submit</Form.Button> */}
    <Button onClick={() => console.log('Clicked')}>Click Here</Button>

  </Form>
   }
};

export default Login;