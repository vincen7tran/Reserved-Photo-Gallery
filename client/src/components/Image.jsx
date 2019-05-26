import React from 'react';

class Image extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      photo: 'Needs_to_be_dynamic'
    };
  }

  render(){
    return (
      <div className="size1" id="two"></div>
    )
  }
}

export default Image;