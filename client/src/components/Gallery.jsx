import React from 'react';
import $ from 'jquery';
import Modal from './Modal.jsx';
// import styled from 'styled-components';

const PhotoContainer = styled.div`
  overflow: hidden;
  margin-left: 0;
  margin-right: 0;
  border: 2px black solid;
  height: 288px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1fr 142px 2fr 288px 1fr 142px 2fr 288px 1fr 142px 2fr 288px 1fr 142px 2fr 288px 1fr 142px 2fr 288px);
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "one three three four six six seven nine nine ten twelve twelve" "two three three five six six eight nine nine eleven twelve twelve";
`;

const One = styled.img`
  grid-area: one; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
  object-fit: cover;
`;

const Two = styled.img`
  grid-area: two; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
  object-fit: cover;
`;

const Three = styled.img`
  grid-area: three; 
  border: 2px black solid;
  height: 288px;
  width: 288px;
  object-fit: cover;
`;

const Four = styled.img`
grid-area: four; 
border: 2px black solid;
height: 142px;
width: 142px;
object-fit: cover;
`;

const Five = styled.img`
  object-fit: cover; 
  grid-area: five; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
`;

const Six = styled.img`
  object-fit: cover; 
  grid-area: six; 
  border: 2px black solid;
  height: 288px;
  width: 288px;
`;

const Seven = styled.img`
  object-fit: cover; 
  grid-area: seven; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
`;

const Eight = styled.img`
  object-fit: cover; 
  grid-area: eight; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
`;

const Nine = styled.img`
  object-fit: cover; 
  grid-area: nine; 
  height: 288px;
  width: 288px;
  border: 2px black solid;
`;

const Ten = styled.img`
  object-fit: cover; 
  grid-area: ten; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
`;

const Eleven = styled.img`
  object-fit: cover; 
  grid-area: eleven; 
  border: 2px black solid;
  height: 142px;
  width: 142px;
`;

const Twelve = styled.img`
  object-fit: cover; 
  grid-area: twelve; 
  height: 288px;
  width: 288px;
  border: 2px black solid;
`;

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      modalImage: null,
      displayedImages: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getPhotos(){
    
    // window.location.pathname 
    var id = Math.floor(Math.random()*100+1).toString().padStart(3, '0');

    $.ajax({
      url: `/API/restaurant/photo/${id}`,
      type: 'GET',
      success: (data) => {
        console.log('Data: ', data[0].photos);
        this.setState({
          displayedImages: data[0].photos
        })
      },
      error: function(err){
        console.log('GET request failed!', err);
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  }

  componentDidMount(){
    this.getPhotos()
  }

  openModal(e){
    e.preventDefault();
    for (var i = 0; i < this.state.displayedImages.length; i++) {
      if (e.target.src === this.state.displayedImages[i].file_path) {
        this.setState({
          modal: true,
          modalImage: this.state.displayedImages[i]
        })
      }
    }
  }

  closeModal(e){
    e.preventDefault();
    this.setState({
      modal: false
    })
  }


  render(){
    if (this.state.displayedImages.length && !this.state.modal) {
      return (
        <PhotoContainer>
          <One onClick={(e) => this.openModal(e)} className="size1" id='one' src={this.state.displayedImages[0].file_path}/>
          <Two onClick={(e) => this.openModal(e)} className='size1' id='two' src={this.state.displayedImages[1].file_path} />
          <Three onClick={(e) => this.openModal(e)} className='size2' id='three' src={this.state.displayedImages[2].file_path} />
          <Four onClick={(e) => this.openModal(e)} className='size1' id='four' src={this.state.displayedImages[3].file_path} />
          <Five onClick={(e) => this.openModal(e)} className='size1' id='five' src={this.state.displayedImages[4].file_path} />
          <Six onClick={(e) => this.openModal(e)} className='size2' id='six' src={this.state.displayedImages[5].file_path} />
          <Seven onClick={(e) => this.openModal(e)} className='size1' id='seven' src={this.state.displayedImages[6].file_path} />
          <Eight onClick={(e) => this.openModal(e)} className='size1' id='eight' src={this.state.displayedImages[7].file_path} />
          <Nine onClick={(e) => this.openModal(e)} className='size2' id='nine' src={this.state.displayedImages[8].file_path} />
          <Ten onClick={(e) => this.openModal(e)} className='size1' id='ten' src={this.state.displayedImages[9].file_path} />
          <Eleven onClick={(e) => this.openModal(e)} className='size1' id='eleven' src={this.state.displayedImages[10].file_path} />
          <Twelve onClick={(e) => this.openModal(e)} className='size2' id='twelve' src={this.state.displayedImages[11].file_path} />
        </PhotoContainer>
      ); 
    } else if (this.state.displayedImages.length && this.state.modal) {
      return (
        <div>
          <Modal displayedImages={this.state.displayedImages} closeModal={this.closeModal} modalImage={this.state.modalImage}/>
          <PhotoContainer>
            <One onClick={(e) => this.openModal(e)} className="size1" id='one' src={this.state.displayedImages[0].file_path}/>
            <Two onClick={(e) => this.openModal(e)} className='size1' id='two' src={this.state.displayedImages[1].file_path} />
            <Three onClick={(e) => this.openModal(e)} className='size2' id='three' src={this.state.displayedImages[2].file_path} />
            <Four onClick={(e) => this.openModal(e)} className='size1' id='four' src={this.state.displayedImages[3].file_path} />
            <Five onClick={(e) => this.openModal(e)} className='size1' id='five' src={this.state.displayedImages[4].file_path} />
            <Six onClick={(e) => this.openModal(e)} className='size2' id='six' src={this.state.displayedImages[5].file_path} />
            <Seven onClick={(e) => this.openModal(e)} className='size1' id='seven' src={this.state.displayedImages[6].file_path} />
            <Eight onClick={(e) => this.openModal(e)} className='size1' id='eight' src={this.state.displayedImages[7].file_path} />
            <Nine onClick={(e) => this.openModal(e)} className='size2' id='nine' src={this.state.displayedImages[8].file_path} />
            <Ten onClick={(e) => this.openModal(e)} className='size1' id='ten' src={this.state.displayedImages[9].file_path} />
            <Eleven onClick={(e) => this.openModal(e)} className='size1' id='eleven' src={this.state.displayedImages[10].file_path} />
            <Twelve onClick={(e) => this.openModal(e)} className='size2' id='twelve' src={this.state.displayedImages[11].file_path} />
          </PhotoContainer>
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