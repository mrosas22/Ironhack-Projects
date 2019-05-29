import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import { Router, Link } from "@reach/router";
import axios from "axios";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";

import { Container } from 'semantic-ui-react';
// import { Header } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';
// import ButtonExample from './ButtonExample';
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";


const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [],
    handleAnimalChange: this.handleAnimalChange,
    handleBreedChange: this.handleBreedChange,
    handleLocationChange: this.handleLocationChange,
    getBreeds: this.getBreeds,
    currentUser: null,
  };
}
handleLocationChange = event => {
  this.setState({
    location: event.target.value
  });
};
handleAnimalChange = event => {
  this.setState(
    {
      animal: event.target.value
    },
    this.getBreeds
  );
};
handleBreedChange = event => {
  this.setState({
    breed: event.target.value
  });
};
getBreeds() {
  if (this.state.animal) {
    petfinder.breed
      .list({ animal: this.state.animal })
      .then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      })
      .catch(console.error);
  } else {
    this.setState({
      breeds: []
    });
  }
}

  componentDidMount(){
    axios.get( 'http://localhost:3001/api/checkuser', { withCredentials:true })
    petfinder.pet.get({
      output: "full",
      id: this.props.id
    })
    .then(responseFromBackend => {
      // console.log("Check User in APP.JS: ",responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }
  syncCurrentUser(user){
    this.setState({ currentUser: user });
    console.log(this.state);
  }
  logout(){
    axios.delete(
      'http://localhost:3001/api/logout',
      {withCredentials:true}
    )
    .then(()=> this.syncCurrentUser(null))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
          <header>
          <Link to='/'>Adopt Me!</Link> 
          </header>
          <Link to='/signup'>Sign Up   </Link> 
          <Link to='/login'>Login</Link> 
          <Link to="/search-params"> <br />
            <span aria-label="search" role="img">
              🔍
            </span>
          </Link>
          
          
          <Provider value={this.state}>
            <Router>
              <Login path="/login" />
              <Signup path="/signup" />
              <Results path="/" />
              <Details path="/details/:id"/> 
              <SearchParams path="/search-params" />  
            </Router>
          </Provider>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));