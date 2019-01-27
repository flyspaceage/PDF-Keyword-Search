import React from 'react';
import './App.css';

export default class ShowResults extends React.Component {

  render() {
    return (
      <section className='container'>
        <h3>Keyword found in document at filepath:</h3>
        <ul>
          {this.props.urls.map(url => (
            <li key={url}>{url}</li>
          ))}
        </ul>
      </section>
    )
  }
}
