import React from 'react';

export default class CoffeeIcon extends React.Component {


  render(){
    return (
      <div  className="coffee-icon-cnt">
        <img src={require(`../img/${this.props.name}.png`)}/>
        <p>{this.props.name}</p>
      </div>
      );
  }
}
