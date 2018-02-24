import React, {Component} from 'react';
import {connect} from 'react-redux';
import RestaurantsContainer from './RestaurantsContainer';
import Search from './Search';
import AllergyFilter from './AllergyFilter';
import {getRestaurants} from './actions/restaurantActions';
import spinner from './assets/spinner.gif';


class HomeContainer extends Component {

  render(){
    let locationNotice = this.props.location ? <h4>Showing {this.props.filteredRestaurants.length || this.props.restaurants.length} results in: {this.props.location}</h4> : null
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Restaurants</h1>
        </header>
        <Search getRestaurants={this.props.getRestaurants}/>
        <AllergyFilter />
        {this.props.restaurantsFetching ? 
           <img className="spinner" src={spinner} alt="loading spinner" /> :
           [locationNotice, <RestaurantsContainer restaurants={this.props.filteredRestaurants || this.props.restaurants}/>]
        }        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    filteredRestaurants: state.filteredRestaurants,
    restaurantsFetching: state.restaurantsFetching,
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: location => dispatch(getRestaurants(location))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
