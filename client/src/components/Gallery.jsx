import React from 'react';
import $ from 'jquery';
import Modal from './Modal.jsx';
// import imageUrls from '../../../db/photoData.js';


class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      displayedImages: undefined
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.chooseDisplayedImages = this.chooseDisplayedImages.bind(this);
  }

  getRequest(){
    var that = this;
    var id = Math.floor(Math.random()*100+1).toString().padStart(3, '0');
    $.ajax({
      url: `/restaurants/${id}`,
      type: 'GET',
      success: function(data){
        console.log('Data: ', data[0].photos);
        that.setState({
          displayedImages: data[0].photos
        })
        
        // for (var i = 0; i < data[0].photos.length; i++){
        //   this.state.displayedImages.push(data.photos[i])
        // }
      },
      error: function(err){
        console.log('GET request failed!', err);
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  }

  // chooseDisplayedImages(){
  //   if (!this.state.displayedImages.length){
  //     var arr = this.state.displayedImages.slice();
  //     for (var i = 0; i < 12; i++){
  //       var random = Math.floor(Math.random() * arr.length);
  //       this.state.displayedImages.push(arr[random]);
  //       arr.splice(arr.indexOf(random), 1);
  //     }
  //   }
  // }

  componentDidMount(){
    this.getRequest()
  }

  openModal(e){
    for (var i = 0; i < this.state.displayedImages.length; i++) {
      if (e.target.src === this.state.displayedImages[i].file_path) {
        this.setState({
          modal: true,
          modalImage: this.state.displayedImages[i]
        })
      }
    }
    e.preventDefault();
  }

  closeModal(e){
    e.preventDefault();
    this.setState({
      modal: false
    })
  }


  render(){
    // this.chooseDisplayedImages()
    if (this.state && this.state.displayedImages && this.state.modal === false) {
      return (
        <div id="photo-container">
          <img onClick={(e) => this.openModal(e)} className="size1" id='one' src={this.state.displayedImages[0].file_path}/>
          <img onClick={(e) => this.openModal(e)} className='size1' id='two' src={this.state.displayedImages[1].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size2' id='three' src={this.state.displayedImages[2].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size1' id='four' src={this.state.displayedImages[3].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size1' id='five' src={this.state.displayedImages[4].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size2' id='six' src={this.state.displayedImages[5].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size1' id='seven' src={this.state.displayedImages[6].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size1' id='eight' src={this.state.displayedImages[7].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size2' id='nine' src={this.state.displayedImages[8].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size1' id='ten' src={this.state.displayedImages[9].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size1' id='eleven' src={this.state.displayedImages[10].file_path} />
          <img onClick={(e) => this.openModal(e)} className='size2' id='twelve' src={this.state.displayedImages[11].file_path} />
        </div>
      ); 
    } else if (this.state && this.state.displayedImages && (this.state.modal === true)) {
      return (
        <div>
          <Modal displayedImages={this.state.displayedImages} closeModal={this.closeModal} modalImage={this.state.modalImage}/>
          <div id="photo-container">
            <img onClick={(e) => this.openModal(e)} className="size1" id='one' src={this.state.displayedImages[0].file_path}/>
            <img onClick={(e) => this.openModal(e)} className='size1' id='two' src={this.state.displayedImages[1].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size2' id='three' src={this.state.displayedImages[2].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size1' id='four' src={this.state.displayedImages[3].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size1' id='five' src={this.state.displayedImages[4].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size2' id='six' src={this.state.displayedImages[5].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size1' id='seven' src={this.state.displayedImages[6].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size1' id='eight' src={this.state.displayedImages[7].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size2' id='nine' src={this.state.displayedImages[8].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size1' id='ten' src={this.state.displayedImages[9].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size1' id='eleven' src={this.state.displayedImages[10].file_path} />
            <img onClick={(e) => this.openModal(e)} className='size2' id='twelve' src={this.state.displayedImages[11].file_path} />
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}



export default Gallery;