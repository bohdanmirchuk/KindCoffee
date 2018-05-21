import React from 'react';
import {Button} from 'reactstrap';

export default class DatesBlock extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className={`transp-cnt ${this.props.show}`}>
        <div className="dates-cnt">
          <h3>Change Report Dates</h3>
          <h4>{this.props.coffeeName}</h4>
          <div>
            <p className="select-part">From</p>
            <select onChange={this.props.handleFirstWeek} value={this.props.firstWeek} className="select-dropdown select-part">
              {this.props.weeks.map(item => <option value={item} key={item}>{item}</option>)}
            </select>
            <p className="select-part">To</p>
            <select onChange={this.props.handleLastWeek} value={this.props.lastWeek} className="select-dropdown select-part">
              {this.props.weeks.map(item => <option value={item} key={item}>{item}</option>)}
            </select>
          </div>
          <div className="button-field">
            <Button onClick={this.props.cancelClick}>Cancel</Button>
            <Button onClick={this.props.handleSubmit}>Change Dates</Button>
          </div>
        </div>
      </div>
      );
  }
}
