import React from 'react';
import './App.css';

export default class ShowResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  render() {
    return (
      <section className='container'>
        <h3>Results:</h3>
        <ul>
          {this.state.results.map(item => (
            <li key={item}></li>
          ))}
        </ul>
      </section>
    )
  }
}
