import React from 'react';
import $ from 'jquery';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      featuredRestaurant: ''
    };
  }

  getRequest(){
    var restID = Math.floor(Math.random()*100+1).toString().padStart(3, '0');
    $.ajax({
      url: '/restaurants/${restID}',
      success: function(data){
        console.log('restID: ',restID);
      },
      error: function(err){
        console.log('getRequest failed!', err);
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
      <div id="photo-container">
        <div className="size1" id="one"></div>
        <div className="size1" id="two"></div>
        <div className="size2" id="three"></div>
        <div className="size1" id="four"></div>
        <div className="size1" id="five"></div>
        <div className="size2" id="six"></div>
        <div className="size1" id="seven"></div>
        <div className="size1" id="eight"></div>
        <div className="size2" id="nine"></div>
        <div className="size1" id="ten"></div>
        <div className="size1" id="eleven"></div>
        <div className="size2" id="twelve"></div>
      </div>
    );
  }
}

export default Gallery;