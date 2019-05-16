import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import { Router, Link } from "@reach/router";
// import pf from "petfinder-client";
import { Container } from 'semantic-ui-react';
// import { Header } from 'semantic-ui-react';
import Login from './Login';
import ButtonExample from './ButtonExample';
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
// import { Provider } from "./SearchContext";



class App extends React.Component {
  render() {
    return (
      <div>
          <header>
              <Link to='/'>Adopt Me!</Link>
          </header>
          <span>
          <Link to='/login'>Login</Link>
          </span>
          <Container>
          
            {/* <Login /> */}
            <ButtonExample />
          </Container>
          <Router>
            <Login path="/login" />
            <Results path="/" />
            <Details path="/details/:id"/> 
            <SearchParams path="/search-params" />  
          </Router>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
