import React, { Component } from "react";
import KateQuotes from './Kate.js';
import AdamQuotes from './Adam.js';
import SarahLQuotes from './SarahL.js';
import DianaQuotes from './Diana.js';
//import axios from 'axios';
//import SearchBox from './searchBox';

class QuotesComponent extends Component {
    constructor() {
        super();
        this.state = {
            //message: "Whazzup?",
            //quotes: KateQuotes
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({});
    }

    componentDidMount() {
    }
    render() {
        return (
            <>
                <h2>Diana</h2>

                {DianaQuotes.Results.map(result=>{
                    return (
                        <p key={result}>{result}</p>
                    );
                })}
                <br />

                <h2>Kate</h2>
                {KateQuotes.Results.map(result=>{
                    return (
                        <p key={result}>{result}</p>
                    );
                })}
                <br />

                <h2>Adam</h2>
                {AdamQuotes.Results.map(result=>{
                    return (
                        <p key={result}>{result}</p>
                    );
                })}                
                <br />

                <h2>Sarah L</h2>
                {SarahLQuotes.Results.map(result=>{
                    return (
                        <p key={result}>{result}</p>
                    );
                })}                
                <br />
            </>
        )
    }
}

export default QuotesComponent;