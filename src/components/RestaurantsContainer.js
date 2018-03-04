import React, {Component} from 'react';
import RestaurantItem from './RestaurantItem'

class RestaurantsContainer extends Component {

  renderRestaurantItems = () => {
    return this.props.restaurants.map(restaurant => <RestaurantItem 
      key={restaurant.apiKey} 
      id={restaurant.apiKey} 
      restaurant={restaurant} />)
  }


  render(){
    return (
      <div className="grid-container">
        {this.renderRestaurantItems()}
      </div>
      )
  }
}

export default RestaurantsContainer;

