import React from 'react';
import ReactDOM from 'react-dom';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageCount: 0
    };
  }

  render(){
    return (
      <div>
        <h2>Hello worlddddd!</h2>
      </div>
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('root'));