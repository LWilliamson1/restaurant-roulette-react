import React, {useEffect, useState} from 'react';
import './App.css';

import Main from '../Main'
import config from '../config';

const API_KEY = config.API_KEY;

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  const loadMapsApi = () => {
    return new_script(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`);
  }

  useEffect(async () => {
    await loadMapsApi()
    setScriptLoaded(true)
  }, [])

  const new_script = (src) => {
    return new Promise(function(resolve, reject){
      const script = document.createElement('script');
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



  return (
      <div className="App">
        {
          scriptLoaded
          &&
          <Main />
        }
      </div>
    );
}

export default App;
