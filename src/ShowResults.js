import React from 'react';
import './App.css';

export default class ShowResults extends React.Component {
  constructor(props) {
    super(props);
    this.checkForSuccess = this.checkForSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      results: ['Show the matching filepath']
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  checkForSuccess() {
    fetch("/getresults", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => function() {
      console.log('Success:', JSON.stringify(response));
      if(response.done === true) {
        // window.removeInterval(timerHandle);
        //update dom
        console.log('set state');
      }
      else {
        //not done yet
      }
    })
    .catch(error => console.error('Error:', error));

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
