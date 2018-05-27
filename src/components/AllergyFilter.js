import React, {Component} from 'react';
import {filterRestaurants, updateFilterCheckboxes} from '../actions/restaurantActions';
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

    this.props.filterRestaurants(this.conditionsArray())
  }

  handleChange = (e) => {  
    let term = e.target.value  
    this.props.updateCheckboxes(term)
  }

  textAndFrequency = () => {
    if(this.conditionsArray().length > 0 ){
      return (
        <div>
          <p style={{margin: 0}} >Avoid {this.conditionsArray().join(', ')}</p>
          <span>Maximum: </span>
          <input className="frequency" type="number" />  
        </div>
        )}
    return (
      <div>
        <br/><br/>
      </div>
    )
  }

  render(){
    return(
      <div className="filter-container">
        <p>Filter for allergens:</p>
        <label htmlFor="nuts">
        <input id="nuts" type="checkbox" value="nuts" 
          checked={this.props.checkboxes.nuts} onChange={this.handleChange} />
          <img className="allergen-img unchecked" src={nuts} alt="nuts" />
          <img className="allergen-img checked" src={noNuts} alt="no nuts" />          
        </label>        
        <label htmlFor="shellfish">
          <input id="shellfish" type="checkbox" value="shellfish" 
          checked={this.props.checkboxes.shellfish} onChange={this.handleChange} />
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