import React, { Component } from 'react';
import FileUpload from './FileUpload.js';
import KeywordInput from './KeywordInput.js';
import ShowResults from './ShowResults.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }
  }
  render() {
    return (
      <div className='App'>
        <header className='header'>
          <h1>Enter Keyword & Sort Documents</h1>
        </header>
        <div className='content'>
          <div className='container'>
            <section className='section'>
              <FileUpload />
              <br />
              <KeywordInput />
              <br />
              <ShowResults items={this.state.results} />
            </section>
          </div>
        </div>
        <footer className='footer'>
          <code>Joseph Layden</code>
        </footer>
      </div>
    );
  }
}

export default App;
