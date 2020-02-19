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
            <div className="portfolio-item">
              {this.props.name}
            </div>
        );
    }
}