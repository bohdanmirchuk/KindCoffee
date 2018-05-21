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
            loading: "show",
            tableShow: "hidden",
            datesBlockShow: "hidden",
            tableData:[],
            firstWeek: "",
            lastWeek: "",
            newFirstWeek: "",
            newLastWeek: "",
            weeks: [],
            newWeeks: []
        };
    this.postData = this.postData.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.showDatesBlock = this.showDatesBlock.bind(this);
    this.handleChangeFirstWeek = this.handleChangeFirstWeek.bind(this);
    this.handleChangeLastWeek = this.handleChangeLastWeek.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMaxPrice = this.getMaxPrice.bind(this);
    this.getMaxPriceOtherDates = this.getMaxPriceOtherDates.bind(this);
    this.getMinPrice = this.getMinPrice.bind(this);
    this.getMinPriceOtherDates = this.getMinPriceOtherDates.bind(this);
    this.getAveragePrice = this.getAveragePrice.bind(this);
    this.getAveragePriceOtherDates = this.getAveragePriceOtherDates.bind(this);
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
        }
          this.setState({firstWeek: result.data[0].pricingDataByWeek[0].week});
          this.setState({lastWeek: result.data[0].pricingDataByWeek[result.data[0].pricingDataByWeek.length-1].week});
          for (let i=0; i<result.data[0].pricingDataByWeek.length; i++){
            this.setState({weeks: [...this.state.weeks, result.data[0].pricingDataByWeek[i].week]}, ()=>this.setState({newWeeks: [...this.state.newWeeks, this.state.weeks[i]]}));
          }
          this.setState({newFirstWeek: this.state.firstWeek});
          this.setState({newLastWeek: this.state.lastWeek});

          this.setState({loading: "hidden"});
          this.setState({tableShow: "show"});

      }, 1000);
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

  getMaxPriceOtherDates(data, weeks){
    let prices = [];

    for (let i=0; i<data.length; i++){
      if(weeks.includes(data[i].week)){
      prices.push(Number(data[i].price));
      }
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

  getMinPriceOtherDates(data, weeks){
    let prices = [];

    for (let i=0; i<data.length; i++){
      if(weeks.includes(data[i].week)){
        prices.push(Number(data[i].price));
      }
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
  getAveragePriceOtherDates(data, weeks){
    let prices = [];
    for (let i=0; i<data.length; i++){
      if(weeks.includes(data[i].week)){
        prices.push(Number(data[i].price));
      }
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
                dates: `${this.state.firstWeek} - ${this.state.lastWeek}`,
                data: this.state.tableData,
                product: this.props.match.params.name
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

          this.setState({newFirstWeek: this.state.firstWeek});
          this.setState({newLastWeek: this.state.lastWeek});

          this.setState({loading: "hidden"});
          this.setState({tableShow: "show"});
        }
      }, 1000);
    })
    .catch( alert );
    }

  showDatesBlock(){
    if (this.state.datesBlockShow === "hidden"){
      this.setState({datesBlockShow: "show"});
    }
    else if (this.state.datesBlockShow === "show"){
      this.setState({datesBlockShow: "hidden"});
    }
  }

  handleChangeFirstWeek(event) {
    this.setState({newFirstWeek: event.target.value});
  }

  handleChangeLastWeek(event) {
    this.setState({newLastWeek: event.target.value});
  }

  handleSubmit() {
    let newWeeksArr = [];
    newWeeksArr = [...this.state.weeks];
    for (let i=0; i<this.state.weeks.length; i++){
      if (this.state.weeks[i] === this.state.newFirstWeek){
        newWeeksArr.splice(0, i);
      }
      if (this.state.weeks[i] === this.state.newLastWeek){
        newWeeksArr.splice(i+1, this.state.weeks.length)
      }
      
    }
    console.log(newWeeksArr);
    console.log(this.state.weeks)
    this.setState({firstWeek: this.state.newFirstWeek});
    this.setState({lastWeek: this.state.newLastWeek});
    this.showDatesBlock();
    this.refreshDataWithNewDates(newWeeksArr);

  }

  refreshDataWithNewDates(weeksArr){
    this.setState({tableData:[]});
    this.setState({loading: "show"});
    this.setState({tableShow: "hidden"});
    fetch('http://159.89.106.160/products/'+this.props.match.params.id)
    .then(response => {
      return response.json();
    })
    .then(result => {
      setTimeout(()=>{
        for (let i=0; i<result.data.length; i++){
          this.setState({tableData: [...this.state.tableData, {name:result.data[i].banner.name, 
            max: this.getMaxPriceOtherDates(result.data[i].pricingDataByWeek, weeksArr),
            min: this.getMinPriceOtherDates(result.data[i].pricingDataByWeek, weeksArr),
            average: this.getAveragePriceOtherDates(result.data[i].pricingDataByWeek, weeksArr),
            pricingDataByWeek: (result.data[i].pricingDataByWeek)
          }]});
          this.setState({firstWeek: result.data[0].pricingDataByWeek[0].week});
          this.setState({lastWeek: result.data[0].pricingDataByWeek[result.data[0].pricingDataByWeek.length-1].week});

          this.setState({loading: "hidden"});
          this.setState({tableShow: "show"});
        }
      }, 1000);
    })
    .catch( alert );
    }

  render(){
    return (
      <div className="table-cnt">
        <ProductHeader tableShow={this.state.tableShow} coffeeName={this.props.match.params.name} data={this.state.tableData} loading={this.state.loading}/>
        <div className="button-field">
          <Button className="dates-button" onClick={this.showDatesBlock}>
            <span>{`${this.state.newFirstWeek} - ${this.state.newLastWeek}`}</span>
          </Button>
          <Button onClick={this.refreshData}>Refresh</Button>
          <Button onClick={this.postData}>Create Report</Button>
        </div>
        <LoadingTableBody loading={this.state.loading}/>
        <TableBody tableShow={this.state.tableShow} data={this.state.data} tableData={this.state.tableData}/>
        <DatesBlock firstWeek={this.state.newFirstWeek} lastWeek={this.state.newLastWeek} weeks={this.state.weeks} 
        handleFirstWeek={this.handleChangeFirstWeek} handleLastWeek={this.handleChangeLastWeek} handleSubmit={this.handleSubmit}
        cancelClick={this.showDatesBlock} show={this.state.datesBlockShow} coffeeName={this.props.match.params.name}/>

      </div>
      );
  }
}
