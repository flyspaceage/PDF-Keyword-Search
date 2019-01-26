import React from 'react';
import './App.css';

export default class List extends React.Component{
  constructor(props){
    super(props);
    this.addItem = this.addItem.bind(this);
    this.state = {
      keyword:[]
    };
  }

  //get user input for keyword to search
  addItem(ev){
    ev.preventDefault();

    let kw = this.state.keyword;
    const newItem = document.getElementById('addInput');
    const form = document.getElementById('addItemForm');

    console.log(newItem.value);
    //send keyword to backend api
    let url = 'http://localhost:8000/keyword';
    let data = {keyword: newItem.value};

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => function() {
      console.log('Success:', JSON.stringify(response));
      // timerHandle = window.setInterval(checkForSuccess, 3000);
    })
    .catch(error => console.error('Error:', error));

    if(newItem.value !== ''){
      kw.push(newItem.value);//add keyword to arr
      this.setState({//set state to new kw arr
        keyword: kw
      });
      newItem.classList.remove('is-danger');
      form.reset();
    }else{
      newItem.classList.add('is-danger');//require input css
    }
  }
  render(){
    return(
      <form id='addItemForm' action='/keyword'>
        <h3 className='title'>Enter Keyword:</h3>
        <input type='text' className='input' id='addInput'
               placeholder='Enter a keyword to search' name='keyword'/><br /><br />
        <button className='button is-info'
          onClick={this.addItem}>Submit Keyword</button><br />
      </form>
    )
  }
}
