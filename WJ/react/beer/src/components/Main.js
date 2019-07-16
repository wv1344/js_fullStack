import React, { Component } from 'react';
import Header from './Header.jsx'
import Search from './Search'
import Results from './Results'


class Main extends Component {
  constructor(){
    super();
    this.state = {
      beers:[],
      loading:true
    }
  }
  componentDidMount(){
    const params = this.props.match.params || {};  // this.props.history
    const searchTerm = params.searchTerm || undefined;
    this.loadBeers(searchTerm);
  }
  loadBeers (searchTerm = "hops") {
    fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`).then(data => data.json())
    .then(data => {
      console.log(data)
    })
  }
  state = {  }
  render() { 
    return ( 
      <div className="wrapper">
        <Header siteName="Beer me!"></Header>
        <Search></Search>
        <Results beers={this.state.beers} loading={this.state.loading}></Results>
      </div>
    );
  }
}
 
export default Main;