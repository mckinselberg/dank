import React, { Component } from 'react';

export default class Link extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    componentDidMount() {
    }


    render() {
        return(
            <li><a href={this.props.url} target="_blank">{this.props.name}</a></li>
        );
    }
}