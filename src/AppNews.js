import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cards.css';
import '../node_modules/bulma/css/bulma.css'


import firebase from './config/Firebase';

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
        <div class="container">
         <div class="section">
         <div class="row columns">
         <div class="column is-one-third">
                    <div class="card large">
                        <div class="card-image">
                            <figure class="image">
                                <img src="https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=" alt="Image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-96x96">
                                        <img src="https://i.imgsafe.org/a4/a4bb9acc5e.jpeg" alt="Image" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4 no-padding">Okinami</p>
                                    <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p>
                                    <p class="subtitle is-6">Lead Developer</p>
                                </div>
                            </div>
                            <div class="content">
                                The Beast stumbled in the dark for it could no longer see the path. It started to fracture and weaken, trying to reshape itself into the form of metal. Even the witches would no longer lay eyes upon it, for it had become hideous and twisted.
                                <div class="background-icon"><span class="icon-twitter"></span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column is-one-third">
                    <div class="card large">
                        <div class="card-image">
                            <figure class="image">
                                <img src="https://source.unsplash.com/uzDLtlPY8kQ" alt="Image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-96x96">
                                        <img src="https://cdn.discordapp.com/avatars/244932903530659841/0c924a19fcf1b5c59bc9dc1b58b61bb0.jpg?size=1024" alt="Image" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4 no-padding">McSocks</p>
                                    <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p>
                                    <p class="subtitle is-6">Developer</p>
                                </div>
                            </div>
                            <div class="content">
                                The soul of the Beast seemed lost forever. Then, by the full moon's light, a child was born; child with the unbridled soul of the Beast that would make all others pale in comparison.
                                <div class="background-icon"><span class="icon-facebook"></span></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="column is-one-third">
                    <div class="card large">
                        <div class="card-image">
                            <figure class="image">
                                <img src="https://source.unsplash.com/pe_R74hldW4" alt="Image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-96x96">
                                        <img src="https://i.imgsafe.org/a5/a5e978ce20.jpeg" alt="Image" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4 no-padding">The Conceptionist</p>
                                    <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p>
                                    <p class="subtitle is-6">Developer</p>
                                </div>
                            </div>
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam! Labore reprehenderit beatae magnam animi!
                                <div class="background-icon"><span class="icon-barcode"></span></div>
                            </div>
                        </div>
                    </div>
                </div>




         </div>
         
         </div>
      </div>
    )
  }
}

export default App;