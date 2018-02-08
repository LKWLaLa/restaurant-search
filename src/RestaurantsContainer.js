import React, {Component} from 'react';
import RestaurantItem from './RestaurantItem'

class RestaurantsContainer extends Component {
  constructor(props){
    super(props)

  }

  renderRestaurantItems = () => {
    return this.props.restaurants.map(restaurant => <RestaurantItem restaurant={restaurant} />)
  }


  render(){
    return (
      <div>
        {this.renderRestaurantItems()}
      </div>
      )
  }
}

export default RestaurantsContainer;

