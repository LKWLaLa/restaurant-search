import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const RestaurantItem = (props) => {
 const {name, streetAddress} = props.restaurant

 const toSlug = (str) => str.replace(/\s+/g, '-').toLowerCase();

  return (
    <div>
      <div className="rest-tile">
        <h2>{name}</h2>
        <p>{streetAddress}</p>
        <Link to={`restaurants/${toSlug(name)}`}>Click here for menu </Link>  
      </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {}
}


export default connect(null, mapDispatchToProps)(RestaurantItem);