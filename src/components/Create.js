import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { Link } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader'



class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.fire= firebase.firestore();
    this.state = {
      title: '',
      description: '',
      author: '',
      imageurl:'',
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarName:"",
      avatarURL: ""
    }
    
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
    this.trace('filename');
    this.trace(filename);
    this.setState({avatarName:filename})

    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase.storage().ref("images") // nama folder di firebase
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
       
     
      this.trace('url:'+this.state.avatarName);
      this.trace('url:'+this.state.filename);
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author} = this.state;

    //console.log('this.avatarURL:'+this.state.avatarURL);
   // console.log('this.avatarURL:'+this.state.avatarName);
    
  
    this.ref.add({
      title,
      description,
      author,
      image:this.state.avatarName,
      imageurl:this.state.avatarURL
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: ''
        
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    
  }



  render() {
    const { title, description, author } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3" value={description}/>
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              
              <div>
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
        </div>
        <p>Process: {this.state.progress}%</p>
        <p>Name: {this.state.avatarName}</p>
        <img src={this.state.avatarURL} alt=''
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

export default Create;