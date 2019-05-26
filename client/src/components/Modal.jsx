import React from 'react';

// props = closeModal, modalImage, displayedImages
class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPhoto: this.props.modalImage
    };
    this.nextImage = this.nextImage.bind(this);
  }

  nextImage(e){
    e.preventDefault()
    this.setState({
      currentPhoto: this.props.displayedImages[ this.props.displayedImages.indexOf(this.state.currentPhoto) + 1 ]
    })
  }

  previousImage(e){
    e.preventDefault()
    this.setState({
      currentPhoto: this.props.displayedImages[ this.props.displayedImages.indexOf(this.state.currentPhoto) - 1 ]
    })
  }

  render(){
    return (
      <div id='simpleModal' className='modal'>
        <span onClick={(e) => this.props.closeModal(e)} className='closeBtn'>&times;</span>
        <div className='outerDiv'>
          
          <a className='leftArrow' onClick={(e) => this.previousImage(e)}>&lt;</a>
            <div className='modal-content-holder'>
              <img className='modal-content' src={this.state.currentPhoto} />
              <div className='modal-footer'>
                <div className='circle-holder'>
                  <p className='circle'>OT</p>
                </div>
                <div className='text-holder'>
                  <div className='text'>OpenTable Diner</div>
                  <div className='dinedOn'>Dined on January 5, 2018</div>
                </div>
              </div>
            </div>
          <a className='rightArrow' onClick={(e) => this.nextImage(e)}>&gt;</a>

        </div>
      </div>
    )
  }
}

export default Modal;