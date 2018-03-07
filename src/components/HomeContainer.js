import React, {Component} from 'react';
import {connect} from 'react-redux';
import RestaurantsContainer from './RestaurantsContainer';
import Search from './Search';
import AllergyFilter from './AllergyFilter';
import {getRestaurants} from '../actions/restaurantActions';
import spinner from '../assets/spinner.gif';


class HomeContainer extends Component {

  render(){
    let locationNotice = this.props.location ? 
      <h4 className="results-notice">
        Showing {this.props.filteredRestaurants.length || this.props.restaurants.length} results in: {this.props.location}
      </h4> : null

    let fetching = this.props.restaurantsFetching
    let noResults = this.props.noResults
    let restaurantsAreReturned = this.props.restaurants.length > 0 && !fetching

    return (
      <div className="home">
        <header className="App-header">
          <span className="App-title">Eatable</span><span>   - find a safe place to eat!</span>
        </header>
          <div className="flex-container">
            {!fetching ? 
              <div className="search-container">
              <Search getRestaurants={this.props.getRestaurants}/>
              {noResults ? 
              <div className="no-results">
                No results found at that location.
              </div> : null} 
            </div> : null}
            {restaurantsAreReturned ? <AllergyFilter /> : null}
            {fetching ? 
            <div className="spinner">
              <img src={spinner} alt="loading" /> 
              <div className="loading-text">Loading restaurant info for {this.props.location}...</div>
             </div> : null} 
          </div> 
        {restaurantsAreReturned ? [
          locationNotice, 
          <RestaurantsContainer 
            restaurants={this.props.filteredRestaurants || this.props.restaurants} 
            history={this.props.history}/>
          ] : null}        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    filteredRestaurants: state.filteredRestaurants,
    restaurantsFetching: state.restaurantsFetching,
    noResults: state.noResults,
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: location => dispatch(getRestaurants(location))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
