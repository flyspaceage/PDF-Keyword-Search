import React, { Component } from 'react';
import './App.css';

export default class FileUpload extends Component {

  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      fileURL: '',
    };
  }

  handleUpload(ev) {
    ev.preventDefault();

    const data = new FormData();
    // Array.from(event.target.files) TODO: Add multi file input
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ fileURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUpload}>
        <section className='container'>
          <h3 className='title'>Select Documents:</h3>
          <input className='input' ref={(ref) => { this.uploadInput = ref; this.fileName = ref; }} type='file' multiple />
            <br /><br />
          <button className='button is-info'>Upload Document</button>
        </section>
      </form>
    );
  }
 }
