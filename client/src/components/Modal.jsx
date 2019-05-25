import React from 'react';

class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPhoto: this.props.modalImage
    };
  }


  render(){
    return (
      <div id='simpleModal' className='modal'>
        <span onClick={(e) => this.props.closeModal(e)} className='closeBtn'>&times;</span>
        <div className='modal-content-holder'>
          <img className='modal-content' src={this.props.modalImage} />
          <div className='modal-footer'>
            <div className='circle-holder'>
              <p className='circle'>OT</p>
            </div>
            <div className='text-holder'>
              <div className='text'>OpenTable Diner</div>
              <div className='dinedOn'>Dined on January 3, 2018</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;