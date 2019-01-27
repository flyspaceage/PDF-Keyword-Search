import React, { Component } from 'react';
import FileUpload from './FileUpload.js';
import KeywordInput from './KeywordInput.js';
import ShowResults from './ShowResults.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.state = {
      selectedFile: null,
      loaded: 0,
      urls:[]
    }
  }
  handleNewItem(kw){
    console.log(kw);
    fetch('http://localhost:8000/keyword', {
      method: 'POST',
      body: JSON.stringify({keyword: kw}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response)=>{
      return response.json()
    }).then((newUrls)=>{
      this.setState({
        urls: newUrls
      });
    });
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
              <KeywordInput onNewItem={this.handleNewItem}/>
              <br />
              <ShowResults urls={this.state.urls} />
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
