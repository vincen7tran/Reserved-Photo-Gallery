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
      <div class="photo-container">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
        <div class="four"></div>
        <div class="five"></div>
        <div class="six"></div>
        <div class="seven"></div>
        <div class="eight"></div>
        <div class="nine"></div>
        <div class="ten"></div>
        <div class="eleven"></div>
        <div class="twelve"></div>
      </div>
    );
  }
}

export default Gallery;