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
    this.props.getRestaurants(this.state.value)
    this.setState({value: ''})
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="search" value={this.state.value} 
                 onChange={this.handleChange} 
                 placeholder="Enter city or zipcode" />
        </form>
      </div>
    )
  }

}

export default Search;