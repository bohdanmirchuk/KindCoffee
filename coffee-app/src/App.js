import React, { Component } from 'react';
import './App.css';
import {Container, Row, Col} from 'reactstrap';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./main/home.js";
import Product from "./main/product.js";
import Header from "./header/header.js"


class App extends Component {
  render() {
    return (
      <div   className="App">
        <Container>
          <Router>
            <Row>
              <Col className="side-bar" xs="1">
                <Row>
                  <Col xs="6">
                  </Col>
                  <Col xs="6" className="nav-menu">
                    <div className="blue-square"></div>
                      <ul>
                        <li>
                          <NavLink to="/">Hom</NavLink>
                        </li>
                        <li>
                          <NavLink to="/products">Pro</NavLink>
                        </li>
                      </ul>
                  </Col>
                </Row>
              </Col>
              <Col xs="10" className="main-cnt">
                <Header/>
                <Route exact path="/" component={Home} />
                <Route path="/:id/:name" component={Product} />
              </Col>
              <Col xs="1" className="side-bar">
              </Col>
            </Row>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
