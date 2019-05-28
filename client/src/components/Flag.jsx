import React from 'react';


class Flag extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    return (
      <div className='report'>
        <h4 className='report-header'>Report a photo problem</h4>
        <button onClick={(e) => this.props.report(e)} className='unrelated' type='button'>Unrelated to restaurant</button>
        <button onClick={(e) => this.props.report(e)} className='inappropriate' type='button'>Inappropriate content</button>
        <button onClick={(e) => this.props.report(e)} className='dont-like' type='button'>I don't like this photo</button>
        <button onClick={(e) => this.props.report(e)} className='cancel' type='button'>Cancel</button>
      </div>
    )
  }
}


export default Flag;