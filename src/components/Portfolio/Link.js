import React, { Component } from 'react';

export default class Link extends Component {
    render() {
        return(
            <li><a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.name}</a></li>
        );
    }
}