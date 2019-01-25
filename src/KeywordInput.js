import React from 'react';
import './App.css';

/* https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j */
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

    // const data = new FormData();
    // Array.from(event.target.files) TODO: Add multi file input
    // data.append('keyword', this.fileName.value);
    //
    // fetch('http://localhost:8000/keyword', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ data: `http://localhost:8000/${body.file}` });
    //   });
    // });

    if(newItem.value !== ''){
      kw.push(newItem.value);//add keyword to arr
      this.setState({//set state to new kw arr
        keyword: kw
      });
      console.log(kw);
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
