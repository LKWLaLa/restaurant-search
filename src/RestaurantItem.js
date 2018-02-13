import React from 'react';
import {Link} from 'react-router-dom';

const RestaurantItem = (props) => {
 const {name, address, id} = props.restaurant

  return (
    <div>
      <div className="rest-tile">
        <h2>{name}</h2>
        <p>{address}</p>
        <Link to={`restaurants/${id}`}>Click here for menu </Link>  
      </div>
    </div>
    )
}


export default RestaurantItem;