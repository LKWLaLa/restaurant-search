import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCurrentRestaurant} from './actions/restaurantActions'

const RestaurantItem = (props) => {
 const {name, streetAddress} = props.restaurant

 const handleRestaurantSelection = () => props.selectCurrentRestaurant(props.restaurant)

  return (
    <div>
      <div className="rest-tile">
        <h2>{name}</h2>
        <p>{streetAddress}</p>
        <Link onClick={handleRestaurantSelection} to={`restaurants/${props.id}`}>Click here for menu </Link>  
      </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCurrentRestaurant: (restaurantDetails) => dispatch(selectCurrentRestaurant(restaurantDetails))
  }
}


export default connect(null, mapDispatchToProps)(RestaurantItem);