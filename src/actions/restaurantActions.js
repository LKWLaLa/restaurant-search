//import fetch from 'cross-fetch';
const EatStreet = require('eatstreet');
const ES = new EatStreet(process.env.REACT_APP_ES_KEY);

export const requestRestaurants = () => {
  console.log("hitting the requestRestaurants action creator")
  return {
    type: 'REQUEST_RESTAURANTS'
  }
}

export const receiveRestaurants = (restaurants) => {
  console.log("hitting the receiveRestaurants action creator")
  return {
    type: 'RECEIVE_RESTAURANTS',
    payload: restaurants
  }
}

export const getRestaurants = (location) => {
  return function(dispatch){
    dispatch(requestRestaurants(location))
    console.log("The location is " + location)

    ES.SearchRestaurants({address:location}, function(err, res){
      if(err){
          console.log(err);
      }
      let restaurantArray = res.restaurants.map(rest => rest)
      dispatch(receiveRestaurants(restaurantArray))
    });
  }
}

