import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
const Clarifai = require('clarifai');

//https://secure.i.telegraph.co.uk/multimedia/archive/03249/archetypal-female-_3249633c.jpg
//https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600
//https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

const app = new Clarifai.App({
 apiKey: 'f0305831570e47c2a327a7a2b125312e'
});

const ParticlesComp={
  "particles": {
    "number": {
      "value": 90,
      "density": {
        "enable": true,
        "value_area": 800
      }
    }
  }
};
class App extends Component {
  constructor(){
    super();
    this.state = {
      input:"",
      imageURL:"",
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }
  calculateFaceLocation=(data)=>{
    console.log(data);
    const clarifaidata=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol : clarifaidata.left_col * width,
      topRow : clarifaidata.top_row * height,
      rightCol: width-(clarifaidata.right_col*width),
      bottomRow:height-(clarifaidata.bottom_row*height)
    }
  }

  displayFace=(box)=>{
    this.setState({box:box});
    //console.log(box);
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageURL:this.state.input});
    //console.log(this.state.imageURL);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => this.displayFace(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
        // there was an error
  }
  onRouteChange=(newroute)=>{
    console.log(newroute);
    console.log('abc');
    if(newroute==='signout'){
      this.setState({isSignedIn:false});
      this.setState({route:'signin'});
    }
    else if(newroute==='home'){
      this.setState({isSignedIn:true});
      this.setState({
        route:newroute
      });
    }
    else{
      this.setState({
        route:newroute
      });
    }
  }
  render() {
    console.log(this.state.route);
    console.log('ppp');
    return (
      <div className="App ">
        <Particles className="particles" params={ParticlesComp} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          :(this.state.route === 'register'
            ?<Register onRouteChange={this.onRouteChange}/> 
            :<div>
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
            </div>)
        }
      </div>
    );
  }
}

export default App;
