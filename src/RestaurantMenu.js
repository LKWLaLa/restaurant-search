import React from 'react';
import {connect} from 'react-redux';

const RestaurantMenu = (props)=>{
  return(
    <div>
      <h1>Hi, I'm eventually going to be a menu page!</h1>
      <p> This is restaurant number: {props.match.params.id}</p>
    </div>
  )
}

export default RestaurantMenu;