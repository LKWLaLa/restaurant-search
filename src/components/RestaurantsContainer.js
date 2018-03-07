import React, {Component} from 'react';
import RestaurantItem from './RestaurantItem'

class RestaurantsContainer extends Component {

  renderRestaurantItems = () => {
    return this.props.restaurants.map(restaurant => <RestaurantItem 
      key={restaurant.apiKey} 
      id={restaurant.apiKey} 
      restaurant={restaurant} 
      history={this.props.history}/>)
  }


  render(){
    return (
      <div className="flex-container">
        {this.renderRestaurantItems()}
      </div>
      )
  }
}

export default RestaurantsContainer;

