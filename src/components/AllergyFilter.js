import React, {Component} from 'react';
import {filterRestaurants, updateFilterCheckboxes} from '../actions/restaurantActions';
import {connect} from 'react-redux';

class AllergyFilter extends Component{

  componentDidUpdate(){
    let conditionsArray = [];
    for (let item in this.props.checkboxes) {
      if (this.props.checkboxes[item] === true){
        conditionsArray.push(item)
      }
    }

    this.props.filterRestaurants(conditionsArray)
  }

  handleChange = (e) => {  
    let term = e.target.value  
    this.props.updateCheckboxes(term)
  }

  render(){
    return(
      <div>
        <input id="nuts" type="checkbox" value="nuts" 
          checked={this.props.checkboxes.nuts} onChange={this.handleChange} />
        <label htmlFor="nuts">Nuts</label>
        <input id="shellfish" type="checkbox" value="shellfish" 
          checked={this.props.checkboxes.shellfish} onChange={this.handleChange} />
         <label htmlFor="shellfish">Shellfish</label>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    checkboxes: state.checkboxes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterRestaurants: (conditionsArray) => dispatch(filterRestaurants(conditionsArray)),
    updateCheckboxes: (term) => dispatch(updateFilterCheckboxes(term))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(AllergyFilter);