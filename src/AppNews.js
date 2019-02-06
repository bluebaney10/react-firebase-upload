import React, { Component } from 'react';
import firebase from './config/Firebase';
import {Link} from 'react-router-dom'
import 'bulma/css/bulma.css'
import './css/AppNews.css'



class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author,image,imageurl} = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        image,
        imageurl
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
   
    return (
       <div>
        	
      
        <section class="container">

       
        <div class="columns is-multiline AppNews-box" >
          
        {this.state.boards.map(board =>
          <div class="column is-4 " >

         
            <div class="card is-shady card-box" key={board.key}>
              <div class="card-image">
                <figure class="image">
                  <img src={board.imageurl} alt="Placeholder" class="modal-button" data-target="modal-image2" />
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <h4>{board.title}</h4>
                  <p>{board.description}</p>
                  <Link to={`/show/${board.key}`}>
                  <span class="button is-link modal-button" data-target="modal-image2">More Detail</span>
                  </Link>
                </div>
              </div>
            </div>
              
          </div>
           )}
         
          </div>
        
          </section>

          </div>

    )
  }
}

export default App;