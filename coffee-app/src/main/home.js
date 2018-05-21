import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CoffeeIcon from "./coffeeIcon.js";

export default class Home extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

  componentDidMount(){
    fetch('http://159.89.106.160/products')
  .then(response => {
    return response.json();
  })
  .then(result => {
    this.setState({ products: result.data });
  })
  .catch( alert );
  };


  render(){
    return (
      <div  className="table-cnt">
        <h3>Home</h3>
      
        <ul className="main-list">
          {
            this.state.products.map(item => <li key={item.id} id={item.id} name={item.name}> 
                <Link name={item.name} to={`/${item.id}/${item.name}`} ><CoffeeIcon name={item.name}/>
              </Link>
            </li>)
          }
        </ul>
        
      </div>
      );
  }
}
