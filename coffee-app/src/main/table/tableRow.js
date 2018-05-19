import React from 'react';
import {Row, Col} from 'reactstrap';

export default class TableRow extends React.Component {


  render(){
    return (
      <div>
        <Row className="white-bg table-row">
          <Col className="table-item"xs="4">{this.props.bannerName}</Col>
          <Col className="text-right table-item" xs="2">${this.props.maxPrice}</Col>
          <Col className="text-right table-item" xs="2">${this.props.averagePrice}</Col>
          <Col className="text-right table-item" xs="2">${this.props.minPrice}</Col>
          <Col className="text-right table-item" xs="2">10000</Col>
        </Row>
      </div>
      );
  }
}
