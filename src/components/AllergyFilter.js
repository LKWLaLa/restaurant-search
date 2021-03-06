import React, {Component} from 'react';
import {filterRestaurants, updateFilterCheckboxes, updateMaximum} from '../actions/restaurantActions';
import {connect} from 'react-redux';
import nuts from '../assets/peanuts.png';
import shellfish from '../assets/shrimp.png';
import noShellfish from '../assets/no-shellfish.png';
import noNuts from '../assets/no-nuts.png';


class AllergyFilter extends Component{

  conditionsArray = () => {
    let conditions = [];
    for (let item in this.props.checkboxes) {
      if (this.props.checkboxes[item] === true){
        conditions.push(item)
      }
    }
    return conditions
  }

  componentDidUpdate(){
    let maxValue = this.props.maxValue
    this.props.filterRestaurants(this.conditionsArray(), maxValue)
  }

  handleChangeCheckboxes = (e) => {  
    let term = e.target.value  
    this.props.updateCheckboxes(term)
  }

  handleChangeMaximum = (e) => {  
    let maxValue = e.target.value  
    this.props.updateMaximum(maxValue)
  }

  textAndFrequency = () => {
    if(this.conditionsArray().length > 0 ){
      return (
        <div>
          <p className="avoid">Avoid {this.conditionsArray().join(', ')}</p>
          <span>Maximum: </span>
          <input className="frequency" type="number" min="0" max="10" 
            value={this.props.maxValue} onChange={this.handleChangeMaximum}/>  
        </div>
        )}
    return null
  }

  render(){
    return(
      <div className="filter-container">
        <p>Filter for allergens:</p>
        <label htmlFor="nuts">
        <input id="nuts" type="checkbox" value="nuts" 
          checked={this.props.checkboxes.nuts} onChange={this.handleChangeCheckboxes} />
          <img className="allergen-img unchecked" src={nuts} alt="nuts" />
          <img className="allergen-img checked" src={noNuts} alt="no nuts" />          
        </label>        
        <label htmlFor="shellfish">
          <input id="shellfish" type="checkbox" value="shellfish" 
          checked={this.props.checkboxes.shellfish} onChange={this.handleChangeCheckboxes} />
          <img className="allergen-img unchecked" src={shellfish} alt="shellfish" />
          <img className="allergen-img checked" src={noShellfish} alt="no shellfish" />
        </label>
        <div className="allergen-text">
          {this.textAndFrequency()}  
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    checkboxes: state.checkboxes,
    maxValue: state.maximum
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterRestaurants: (conditionsArray, maxValue) => dispatch(filterRestaurants(conditionsArray, maxValue)),
    updateCheckboxes: (term) => dispatch(updateFilterCheckboxes(term)),
    updateMaximum: (maxValue) => dispatch(updateMaximum(maxValue))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(AllergyFilter);