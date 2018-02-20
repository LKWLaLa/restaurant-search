import React, {Component} from 'react';
import {connect} from 'react-redux';
import RestaurantsContainer from './RestaurantsContainer';
import Search from './Search';
import {getRestaurants} from './actions/restaurantActions';
import spinner from './assets/spinner.gif';


class HomeContainer extends Component {

  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Restaurants</h1>
        </header>
        <Search getRestaurants={this.props.getRestaurants}/>
        {this.props.restaurantsFetching ? 
           <img className="spinner" src={spinner} alt="loading spinner" /> :
          <RestaurantsContainer restaurants={this.props.restaurants}/>
        }        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    restaurants: state.restaurants,
    restaurantsFetching: state.restaurantsFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: location => dispatch(getRestaurants(location))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
