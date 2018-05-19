import React from 'react';
import {Button } from 'reactstrap';
import ProductHeader from "./table/productHeader.js";
import TableBody from"./table/tableBody.js";
import LoadingTableBody from"./table/loadingTableBody.js";
import DatesBlock from "./table/datesBlock.js";


export default class Product extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
            message: "",
            loading: "show",
            tableShow: "hidden",
            datesBlockShow: "hidden",
            tableData:[],
            firstWeek: "",
            lastWeek: ""
        };
    this.postData = this.postData.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.showDatesBlock = this.showDatesBlock.bind(this);
  }

  componentDidMount(){
    fetch('http://159.89.106.160/products/'+this.props.match.params.id)
    .then(response => {
      return response.json();
    })
    .then(result => {
      setTimeout(()=>{
        for (let i=0; i<result.data.length; i++){
          this.setState({tableData: [...this.state.tableData, {name:result.data[i].banner.name, 
            max: this.getMaxPrice(result.data[i].pricingDataByWeek),
            min: this.getMinPrice(result.data[i].pricingDataByWeek),
            average: this.getAveragePrice(result.data[i].pricingDataByWeek),
            pricingDataByWeek: (result.data[i].pricingDataByWeek)
          }]});
          this.setState({firstWeek: result.data[0].pricingDataByWeek[0].week});
          this.setState({lastWeek: result.data[0].pricingDataByWeek[result.data[0].pricingDataByWeek.length-1].week});

          this.setState({loading: "hidden"});
          this.setState({tableShow: "show"});
        }
      }, 2000);
    })
    .catch( alert );
    }

  getMaxPrice(data){
    let prices = [];
    for (let i=0; i<data.length; i++){
      prices.push(Number(data[i].price));
    }
    return Math.max(...prices).toFixed(2);
  }

  getMinPrice(data){
    let prices = [];
    for (let i=0; i<data.length; i++){
      prices.push(Number(data[i].price));
    }
    return Math.min(...prices).toFixed(2);
  }

  getAveragePrice(data){
    let prices = [];
    for (let i=0; i<data.length; i++){
      prices.push(Number(data[i].price));
    };
    let averageFromSum = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    return averageFromSum(prices).toFixed(2);
  }

  postData() {
    console.log(this.state);
        fetch('http://159.89.106.160/products/sendemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                to: 'lecoqsportif1991@gmail.com',
                dates: '26/02/2018 - 29/04/2018',
                data: [
                    {max: 9, min: 3, name: 'McCafe'},
                    {max: 8, min: 5, name: 'McbjmCafe'}
                ],
                product: "Americano"
            })
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            });
    }

  refreshData(){
    this.setState({tableData:[]});
    this.setState({loading: "show"});
    this.setState({tableShow: "hidden"});
    this.setState({firstWeek:""});
    this.setState({lastWeek:""});
    fetch('http://159.89.106.160/products/'+this.props.match.params.id)
    .then(response => {
      return response.json();
    })
    .then(result => {
      setTimeout(()=>{
        for (let i=0; i<result.data.length; i++){
          this.setState({tableData: [...this.state.tableData, {name:result.data[i].banner.name, 
            max: this.getMaxPrice(result.data[i].pricingDataByWeek),
            min: this.getMinPrice(result.data[i].pricingDataByWeek),
            average: this.getAveragePrice(result.data[i].pricingDataByWeek),
          }]});
          this.setState({firstWeek: result.data[0].pricingDataByWeek[0].week});
          this.setState({lastWeek: result.data[0].pricingDataByWeek[result.data[0].pricingDataByWeek.length-1].week});

          this.setState({loading: "hidden"});
          this.setState({tableShow: "show"});
        }
      }, 2000);
    })
    .catch( alert );
    }

  showDatesBlock(){
    this.setState({datesBlockShow: "show"});
  }

  render(){
    return (
      <div className="table-cnt">
        <ProductHeader tableShow={this.state.tableShow} coffeeName={this.props.match.params.name} data={this.state.tableData} loading={this.state.loading}/>
        <div className="button-field">
          <Button className="dates-button" onClick={this.showDatesBlock}>
            <span className={`${this.state.loading} blured`}>01/01/2018</span>
            <span>{`${this.state.firstWeek} - ${this.state.lastWeek}`}</span>
            <span className={`${this.state.loading} blured`}>31/12/2018</span>
          </Button>
          <Button onClick={this.refreshData}>Refresh</Button>
          <Button onClick={this.postData}>Create Report</Button>
        </div>
        <LoadingTableBody loading={this.state.loading}/>
        <TableBody tableShow={this.state.tableShow} data={this.state.data} tableData={this.state.tableData}/>
        <DatesBlock show={this.state.datesBlockShow} coffeeName={this.props.match.params.name}/>

      </div>
      );
  }
}
