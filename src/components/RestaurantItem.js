import React from 'react';
import {Link} from 'react-router-dom';

const RestaurantItem = (props) => {
 const {name, streetAddress, city, state, zip, foodTypes, logoUrl} = props.restaurant

  return (
    <div className="rest-tile">
      <img className="rest-icon" src={logoUrl} alt="restaurant logo"/>
      <div className="rest-text">
        <h2>{name}</h2>
        <p>{streetAddress}, {city}, {state} {zip}</p>
        <p className="food-types">{foodTypes.slice(0,3).join(', ')}</p>
        <Link to={`restaurants/${props.id}`}>Click here for menu </Link>  
      </div>
    </div>
    )
}

export default RestaurantItem;