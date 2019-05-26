import React from 'react';


class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPhoto: 'https://s3-us-west-1.amazonaws.com/asyncphotos/1.jpg'
    };
  }

  render(){
    return (
      <div id='simpleModal' className='modal'>
        <span onClick={(e) => this.props.closeModal(e)} className='closeBtn'>&times;</span>
        <div>
          <div className='modal-content' id='one' />
          <div className='modal-footer'>
            <div className='circle'>OT</div>
            <div>OpenTable</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;