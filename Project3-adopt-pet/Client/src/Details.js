import React, { Component } from "react";
import pf from 'petfinder-client';
import { navigate } from "@reach/router";
import { Link,  Router } from "@reach/router";  //NavLink,
import axios from "axios";
import Modal from "./Modal";
import Navbar from './Navbar'
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary'

const petfinder = pf ({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class Details extends React.Component {
    // state = { loading: true };
    constructor(props) {
        super(props);
        this.state = { loading: true, showModal: false };
      }
    componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_URL}/api/checkuser`, { withCredentials:true })
          .then(responseFromBackend => {
            // console.log("Check User in APP.JS: ",responseFromBackend.data)
            const { userDoc } = responseFromBackend.data;
            this.syncCurrentUser(userDoc);
          });
      
          petfinder.pet
          .get({
            output: "full",
            id: this.props.id
          })
          .then(data => {
            let breed;
            if (Array.isArray(data.petfinder.pet.breeds.breed)) {
              breed = data.petfinder.pet.breeds.breed.join(", ");
            } else {
              breed = data.petfinder.pet.breeds.breed;
            }
            this.setState({
              name: data.petfinder.pet.name,
              animal: data.petfinder.pet.animal,
              location: `${data.petfinder.pet.contact.city}, ${
                data.petfinder.pet.contact.state
              }`,
              description: data.petfinder.pet.description,
              media: data.petfinder.pet.media,
              breed,
              loading: false
            });
          })
          .catch(() => {
            navigate("/");
          });
    }
    syncCurrentUser(user){
      this.setState({ currentUser: user });
      console.log(this.state);
    }
    logout(){
      axios.delete(
        `${process.env.REACT_APP_API_URL}/api/logout`,
        {withCredentials:true}
      )
      .then(()=> this.syncCurrentUser(null))
      .catch(err => console.log(err))
    }
  
    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    render() {
      if (this.state.loading) {
        return <h1>loading … </h1>;
      }
  
      const { name, animal, breed, location, description, media, showModal } = this.state;
  
      return (
        <div className="details">
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} — ${breed} — ${location}`}</h2>
            <button onClick={this.toggleModal}>Adopt {name}</button>
            <p>{description}</p>
            {showModal ? (
              <Modal>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.toggleModal}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </Modal>
            ) : null}
          </div>
      </div>
    );
  }
}
  
export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
