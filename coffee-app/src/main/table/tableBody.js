import React from 'react';
import {Row, Col} from 'reactstrap';
import TableRow from"./tableRow.js";

export default class TableBody extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  sortTable(n) {
  // var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  let table = document.getElementById("table-body");
  let switching = true;
  let switchcount = 0;
  let shouldSwitch, i;
  //Set the sorting direction to ascending:
  let dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    let rows = table.getElementsByClassName("table-row");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      let x = rows[i].getElementsByClassName("table-item")[n];
      let y = rows[i + 1].getElementsByClassName("table-item")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir === "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir === "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

  render(){
    return (
      <div className={this.props.tableShow} id="table-body">
        
        <Row className="table-header">
          <Col xs="4">Name</Col>
          <Col className="text-right" xs="2">Max Price</Col>
          <Col className="text-right" xs="2">Average Price</Col>
          <Col className="text-right" xs="2">Min Price</Col>
          <Col className="text-right" xs="2">Sold Out</Col>
        </Row>
        {
          this.props.tableData.map(item => <TableRow key={item.name} bannerName={item.name} 
            maxPrice={item.max}
            minPrice={item.min}
            averagePrice={item.average}
            />)
          }

      </div>
      );
  }
}
