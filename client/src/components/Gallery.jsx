import React from 'react';
import $ from 'jquery';
import Modal from './Modal.jsx';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentRestaurant: 'Needs_to_be_dynamic',
      modal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getRequest(){
    var restID = Math.floor(Math.random()*100+1).toString().padStart(3, '0');
    $.ajax({
      url: '/restaurants/${restID}',
      type: 'GET',
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

  openModal(e){
    e.preventDefault();
    this.setState({
      modal: true
    })
  }

  closeModal(e){
    e.preventDefault();
    this.setState({
      modal: false
    })
  }

  render(){
    if (this.state.modal === false){
      return (
        <div id="photo-container">
          <div onClick={(e) => this.openModal(e)} className="size1" id="one"></div>
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
    } else {
      return (
        <Modal closeModal={this.closeModal} />
      )
    }
  }
}

export default Gallery;