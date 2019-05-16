import React from'react';
import pf from 'petfinder-client';
import { navigate } from "@reach/router/lib/history";
import { Switch,  Route } from "react-router-dom";  //NavLink,
import axios from "axios";
import Navbar from './Navbar'
import Carousel from './Carousel';

const petfinder = pf ({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class Details extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { loading: true };
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
        .catch(err => this.setState({ error: err }));
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
  

    render() {
      if (this.state.loading) {
        return <h1>loading … </h1>;
      }
  
      const { name, animal, breed, location, description, media } = this.state;
  
      return (
        <div className="details">
          <header>
          <Navbar currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
        </header>
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} — ${breed} — ${location}`}</h2>
            <p>{description}</p>
          </div>
        </div>
      );
    }
}
  
export default Details;


// import React from 'react'; 
// import pf from 'petfinder-client';
// import Carousel from './Carousel';

// const petfinder = pf({
//   key: process.env.API_KEY,
//   secret: process.env.API_SECRET
// });


// class Details extends React.Component {
//   state={
//       loading: true
//     }
  
//    componentDidMount() {
//     petfinder.pet.get({
//       output: "full",
//       id: this.props.id
//     }) .then (data => {
//       const pet = data.petfinder.pet;
//       let breed;
//       if (Array.isArray(data.petfinder.pet.breeds.breed)) {
//         breed = data.petfinder.pet.breeds.breed.join(',');
//       } else {
//         breed = data.petfinder.pet.breeds.breed;
//       }
//         this.setState({
//           name: pet.name,
//           animal: pet.animal,
//           location: `${pet.contact.city}, ${pet.contact.state}`,
//           description: pet.description,
//           media: pet.media,
//           breed,
//           loading: false
//         })
//         .catch(() => { 
//           navigate ('/');
//       })
//     })
//   }
//   render () {
//       if (this.state.loading) {
//         return <h1> Loading</h1>
//       }
//       const {animal, breed, location, description, media} = this.state;
//       return (
//         <div className="details">
//           <Carousel media={media} />
//           <div>
//             <h1>{name}</h1>
//             <h2>{animal} - {breed} - {location}</h2>
//             <p> Description</p>
//           </div>
//         </div>
        
//       );
//   }  
// }


// export default Details;