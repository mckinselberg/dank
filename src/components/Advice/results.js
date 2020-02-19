import React, { Component } from 'react';

export default class Results extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
      }
      this.renderButton = this.renderButton.bind(this);
    }

    componentDidMount() {
        this.props.getData();
    }

    renderButton() {
        return <button onClick={this.props.getData}>another</button>;
    }


    render() {
        let button = this.renderButton();
        if(this.props.results !== null) {
            if(this.props.results.total_results !== undefined) {
                console.log(this.props.results)
                return (
                    <div>
                        <p>Results: {this.props.results.total_results}</p>
                        {this.props.results.slips.map((slip,index) => (
                            <p key={index}>{slip.advice}</p>
                        ))}
                        {button}
                    </div>
                );
            } else if (this.props.results.message !== undefined) {
                return (
                    <div>
                        <p>{this.props.results.message.text}</p>
                        {button}
                    </div>
                );
            } else {
                return(     
                    <div>
                        <p>{this.props.results.slip.advice}</p>
                        {button}
                    </div>
                );
            }
        } else {
            return <div>loading...</div>
        }
    }

}