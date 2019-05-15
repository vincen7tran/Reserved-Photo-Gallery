import React from 'react';

class Gallery extends Component{
  constructor(props){
    super(props);
    this.state = {
      numImages: 0
    }
  };

  render(){
    return (
      <div>
        <h2>Hello world!</h2>
      </div>
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('root'));