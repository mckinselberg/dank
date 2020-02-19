import React, { Component } from 'react';
import axios from 'axios';
//import SearchBox from './searchBox';
import Results from './results';

export default class Advice extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
          adviceObj:null,
          loading:true,
          searchTerm:null
      }
      this.getData = this.getData.bind(this);
      this.getSearchData = this.getSearchData.bind(this);
    }

    componentDidMount() {
        //this.getData()
    }

    getData() {
        this.setState({loading:true});
        this.setState({searchTerm:null})
        axios.get('https://api.adviceslip.com/advice')
        .then(res => {
            const data = res.data
            this.setState({adviceObj:data,loading:false})
        });
    }

    getSearchData(e) {
        this.setState({loading:true});
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
        
    }


    render() {
        //console.log(this.state.adviceObj)
        return(
            <div className="advice-container">
                <h1 style={{marginTop:'10px'}}>Advice</h1>
                {/*<SearchBox getSearchData={this.getSearchData} searchTerm={this.state.searchTerm}/>*/}
                <Results getData={this.getData} results={this.state.adviceObj} />
            </div>
        );
    }
}