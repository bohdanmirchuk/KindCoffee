import React from 'react';
import {Row, Col} from 'reactstrap';
import TableRow from"./tableRow.js";

export default class LoadingTableBody extends React.Component {
  
  // constructor(props){
  //   super(props);
  //   this.state = {

  //   }
  // }

  render(){
    return (
      <div className={`loading-table ${this.props.loading}`}>
        
        <Row className="table-header">
          <Col xs="4">Name</Col>
          <Col className="text-right" xs="2">Max Price</Col>
          <Col className="text-right" xs="2">Average Price</Col>
          <Col className="text-right" xs="2">Min Price</Col>
          <Col className="text-right" xs="2">Sold Out</Col>
        </Row>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>
        <TableRow bannerName="Cafe Network" maxPrice="99.99" minPrice="99.99" averagePrice="99.99"/>

      </div>
      );
  }
}
