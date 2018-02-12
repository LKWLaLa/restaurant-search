import React, {Component} from 'react';

class Search extends Component {

  constructor(){
    super();

    this.state = {
      value:''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    alert(`You have searched for ${this.state.value}.`)
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} 
                 onChange={this.handleChange} 
                 placeholder="Enter city or zipcode to search for restaurants" />
        </form>
      </div>
    )
  }

}

export default Search;