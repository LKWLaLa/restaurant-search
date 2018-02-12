import React from 'react';

const RestaurantItem = (props) => {
 const {name, address} = props.restaurant

  return (
    <div>
      <div className="rest-tile">
        <h2>{name}</h2>
        <p>{address}</p>
      </div>
    </div>
    )
}


export default RestaurantItem;