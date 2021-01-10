import React, { Component } from 'react';

export default class PortfolioItem extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    componentDidMount() {
    }


    render() {
        return(
            <div className={`portfolio-item ${this.props.class}`}>
              <iframe scrolling="no" frameBorder="0" src={this.props.url}></iframe>
            </div>
        );
    }
}