import React from 'react';
import {Row, Col} from 'reactstrap';

export default class ProductHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  getMaxPrice(data){
    let prices = [];
    for (let i=0; i<data.length; i++){
      prices.push(Number(data[i].max));
    }
    return Math.max(...prices).toFixed(2);
  }

  getMinPrice(data){
    let prices = [];
    for (let i=0; i<data.length; i++){
      prices.push(Number(data[i].min));
    }
    return Math.min(...prices).toFixed(2);
  }

  getAveragePrice(data){
    let prices = [];
    for (let i=0; i<data.length; i++){
      prices.push(Number(data[i].average));
    }
    let averageFromSum = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    return averageFromSum(prices).toFixed(2);
  }

  render(){
    return (
      <div>
        <h3>{this.props.coffeeName}</h3>
        <Row className="table-header"> 
          <Col xs="6">Name</Col>
          <Col className="text-right" xs="2">Max Price</Col>
          <Col className="text-right" xs="2">Average Price</Col>
          <Col className="text-right" xs="2">Min Price</Col>
        </Row>
        <Row className="white-bg general-row">
          <Col xs="6">{this.props.coffeeName}</Col>
          <Col className={`text-right loading ${this.props.loading}`} xs="2">$99.99</Col>
          <Col className={`text-right ${this.props.tableShow}`} xs="2">${this.getMaxPrice(this.props.data)}</Col>
          <Col className={`text-right loading ${this.props.loading}`} xs="2">$99.99</Col>
          <Col className={`text-right ${this.props.tableShow}`} xs="2">${this.getAveragePrice(this.props.data)}</Col>
          <Col className={`text-right loading ${this.props.loading}`} xs="2">$99.99</Col>
          <Col className={`text-right ${this.props.tableShow}`} xs="2">${this.getMinPrice(this.props.data)}</Col>
        </Row>
      </div>
      );
  }
}
