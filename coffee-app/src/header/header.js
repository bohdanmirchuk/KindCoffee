import React from 'react';
import {Row, Col} from 'reactstrap';


export default class Header extends React.Component {

  render(){
    return (
      <header>
        <Row>
              <Col className="logo" xs="2">
                KindCoffee
              </Col>
              <Col sm={{ size: 3, offset: 7 }} className="">
              basket
              </Col>
            </Row>
      </header>
      );
  }
}
