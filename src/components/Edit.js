import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { Link } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader'

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: '',
      image:'',
      imageurl:''
    };

    this.handleUploadStart=this.handleUploadStart.bind(this);
    this.handleProgress=this.handleProgress.bind(this);
    this.handleUploadError=this.handleUploadError.bind(this);
    this.handleUploadSuccess=this.handleUploadSuccess.bind(this);
    this.trace=this.trace.bind(this);

  }


  trace(str){
    console.log(str);

  }

  handleUploadStart(){
    this.trace('handleUploadStart');
    this.setState({ isUploading: true, progress: 0 });
  
  }
  
  handleProgress(progress){
    this.trace('handleProgress');
    this.setState({ progress });
  }

  handleUploadError(error){
    this.trace('handleUploadError');
    this.setState({ isUploading: false });
    this.trace('handleUploadError');
    this.trace(error);
  }
  
  handleUploadSuccess(filename){
    this.trace('handleUploadSuccess');
    this.trace('image:'+this.state.image);
    this.trace('new image:'+filename);
     // Delete the file on storage
     const storageRef = firebase.storage().ref(`images/${this.state.image}`);
    
     storageRef.delete()
     .then(() => {
         console.log("Delete file success");
     })
     .catch((error) => {
         console.log("Delete file error : " , error.message);
     });
     


   

    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase.storage().ref("images") // nama folder di firebase
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageurl: url,image:filename }));
       
    }


  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          image:board.image,
          imageurl:board.imageurl
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author ,image,imageurl} = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      title,
      description,
      author,
      image,
      imageurl
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        image:'',
        imageurl:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
            
              <p>Process: {this.state.image}</p>
              <FileUploader
            accept='*' name='avatar'
            randomizeFilename
            
            storageRef={
              firebase.storage().ref('images')
            }
            onUploadStart = {this.handleUploadStart}
            onUploadError = {this.handleUploadError}
            onUploadSuccess = {this.handleUploadSuccess}
            onProgress = {this.handleProgress}
          />
            
            <p>Process: {this.state.progress}%</p>
            <img src={this.state.imageurl} alt=''
            style={{width:'40%', height:'40%'}}/>
            <br/><br/>


              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;