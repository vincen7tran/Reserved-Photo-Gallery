import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageCount: 0
    };
  }

  getRequest(){
    $.ajax({
      url: '/restaurants',
      success: function(data){
        console.log(data);
      },
      error: function(err){
        console.log(err);
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  }

  componentDidMount(){
    this.getRequest()
  }

  render(){
    return (
      <div>
        <h2>React rendered!</h2>
      </div>
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('root'));