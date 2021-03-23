import React from 'react';

import './App.css';
import Dropzone from "./dropzone/Dropzone";
import identity from "netlify-identity-widget";
identity.init();

function App() {
  if(identity.currentUser())
  return (
    <div>
      <p className="title">Upload</p>
      <div className="content">
        <Dropzone />
      </div>
    </div>
  );else {
    identity.open('login');
  }
}

export default App;
