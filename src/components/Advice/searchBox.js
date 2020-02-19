import React, { Component } from 'react';

export default class Advice extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
      }
    }

    render() {
        return(
            <input placeholder="search" onChange={this.props.getSearchData} value={this.props.searchTerm !== null ? this.props.searchTerm : ""}/>
        );
    }

}