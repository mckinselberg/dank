import React, { Component } from 'react';
import KateQuotes from './Kate.js';
import AdamQuotes from './Adam.js';
import SarahLQuotes from './SarahL.js';

const allQuotes = [];
allQuotes(...KateQuotes, ...AdamQuotes, ...SarahLQuotes, ...KateQuotes);

export default class SearchBox extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        allQuotes:allQuotes
      }
    }

    getSearchData(e) {
      this.setState({loading:true});
      /*
      if(e.target.vaue !== null) {
          this.setState({loading:true})
          this.setState({searchTerm:e.target.value})
          axios.get(`https://api.adviceslip.com/advice/search/${e.target.value}`)
          .then(res => {
              const data = res.data
              this.setState({adviceObj:data,loading:false})
          }).catch(error => {
              console.log(error);
              this.getData();
          });
      }
      */
  }

    render() {
        return(
            <input placeholder="search" onChange={this.getSearchData} value={this.props.searchTerm !== null ? this.props.searchTerm : ""}/>
        );
    }

}