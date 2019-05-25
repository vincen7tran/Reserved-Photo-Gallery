import React from 'react';
import $ from 'jquery';
import Modal from './Modal.jsx';
import imageUrls from '../../../db/photoData.js';


class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageUrls: imageUrls.imagePaths,
      displayedImages: [],
      modal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseDisplayedImages = this.chooseDisplayedImages.bind(this);
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

  chooseDisplayedImages(){
    var arr = this.state.imageUrls.slice();
    for (var i = 0; i < 12; i++){
      var random = Math.floor(Math.random() * arr.length);
      this.state.displayedImages.push(arr[random]);
      arr.splice(arr.indexOf(random), 1);
    }
  }

  render(){
    this.chooseDisplayedImages()
    if (this.state.modal === false){
      return (
        <div id="photo-container">
          <img onClick={(e) => this.openModal(e)} className="size1" id='one' src={this.state.displayedImages[0]} />
          <img className='size1' id='two' src={this.state.displayedImages[1]} />
          <img className='size2' id='three' src={this.state.displayedImages[2]} />
          <img className='size1' id='four' src={this.state.displayedImages[3]} />
          <img className='size1' id='five' src={this.state.displayedImages[4]} />
          <img className='size2' id='six' src={this.state.displayedImages[5]} />
          <img className='size1' id='seven' src={this.state.displayedImages[6]} />
          <img className='size1' id='eight' src={this.state.displayedImages[7]} />
          <img className='size2' id='nine' src={this.state.displayedImages[8]} />
          <img className='size1' id='ten' src={this.state.displayedImages[9]} />
          <img className='size1' id='eleven' src={this.state.displayedImages[10]} />
          <img className='size2' id='twelve' src={this.state.displayedImages[11]} />
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