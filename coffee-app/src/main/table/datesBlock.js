import React from 'react';
import {Row, Col} from 'reactstrap';

export default class DatesBlock extends React.Component {
  
  // constructor(props){
  //   super(props);
  //   this.state = {

  //   }
  // }

  render(){
    return (
      <div className={`transp-cnt ${this.props.show}`}>
        <div className="dates-cnt">
          <h3>Change Report Dates</h3>
          <h4>{this.props.coffeeName}</h4>
        </div>
      </div>
      );
  }
}
