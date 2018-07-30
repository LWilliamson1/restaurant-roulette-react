import React, {Component} from 'react';
import './App.css';

import Main from '../Main'
import config from '../config';

const API_KEY = config.API_KEY;

class App extends Component {

  state = {
    scriptLoaded: false
  }
  

  setScriptLoaded = () => {
    this.setState({scriptLoaded: true})
  }

  new_script(src) {
    return new Promise(function(resolve, reject){
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
      document.body.appendChild(script);
    })
  };

  loadMapsApi = () => {
      var script = this.new_script(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`);
      return script;
  }

  componentDidMount () {

  }

  render() {
    if(!this.state.scriptLoaded) {
      this.loadMapsApi().then(() => this.setScriptLoaded())
    }
    return (
      <div className="App">
        {
          this.state.scriptLoaded
          &&
          <Main />
        }
      </div>
    );
  }
}

export default App;
