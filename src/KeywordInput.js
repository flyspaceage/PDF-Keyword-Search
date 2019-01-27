import React from 'react';
import './App.css';

export default class List extends React.Component{
  constructor(props){
    super(props);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.state = {
      keyword:''
    };
  }

  //get user input for keyword to search
  handleBtnClick(ev){
    ev.preventDefault();

    console.log(this.props);
    this.props.onNewItem(this.addInput.value);//keyword value

  }

  render(){
    return(
      <form action='/keyword'>
        <h3 className='title'>Enter Keyword:</h3>
        <input ref={(ref) => { this.addInput = ref; }} type='text' className='input'
               placeholder='Enter a keyword to search' name='keyword'/><br /><br />
        <button className='button is-info'
          onClick={this.handleBtnClick}>Submit Keyword</button><br />
      </form>
    )
  }
}
