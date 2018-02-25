import React, {Component} from 'react';
import {filterRestaurants} from './actions/restaurantActions';
import {connect} from 'react-redux';

class AllergyFilter extends Component{
  constructor(props){
    super(props)

    this.state = {
      nuts: false,
      shellfish: false
    }
  }


  componentDidUpdate(){
    let conditionsArray = [];
    for (let item in this.state) {
      if (this.state[item] === true){
        conditionsArray.push(item)
      }
    }

    this.props.filterRestaurants(conditionsArray)
  }

  handleChange = (e) => {  
    let term = e.target.value  
    this.setState((prevState) => { 
      return {[term]: !prevState[term]} 
    })
  }

  render(){
    return(
      <div>
        <input id="nuts" type="checkbox" value="nuts" onChange={this.handleChange} />
        <label htmlFor="nuts">Nuts</label>
        <input id="shellfish" type="checkbox" value="shellfish" onChange={this.handleChange} />
         <label htmlFor="shellfish">Shellfish</label>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterRestaurants: (conditionsArray) => {dispatch(filterRestaurants(conditionsArray))}
  }
} 

export default connect(null, mapDispatchToProps)(AllergyFilter);