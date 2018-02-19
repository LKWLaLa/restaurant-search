import React from 'react';
import {Link} from 'react-router-dom';
import {getMenu} from './actions/restaurantActions';
import {connect} from 'react-redux';

const RestaurantItem = (props) => {
 const {name, streetAddress} = props.restaurant
 
 const handleGetMenu = (e) => {
  e.preventDefault();
  props.getMenu(props.id)
 }

  return (
    <div>
      <div className="rest-tile">
        <h2>{name}</h2>
        <p>{streetAddress}</p>
        <Link to={`restaurants/${props.id}`} 
        onClick={handleGetMenu}>Click here for menu </Link>  
      </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {getMenu: (id) => dispatch(getMenu(id))}
}


export default connect(null, mapDispatchToProps)(RestaurantItem);