//import fetch from 'cross-fetch';
const EatStreet = require('eatstreet');
const ES = new EatStreet(process.env.REACT_APP_ES_KEY);

export const requestRestaurants = () => {
  return {
    type: 'REQUEST_RESTAURANTS'
  }
}

export const receiveRestaurants = (restaurants) => {
  return {
    type: 'RECEIVE_RESTAURANTS',
    payload: restaurants
  }
}

export const getRestaurants = (location) => {
  return function(dispatch){
    dispatch(requestRestaurants())

    ES.SearchRestaurants({address:location}, function(err, res){
      if(err){
          console.log(err);
      }
      let restaurantArray = res.restaurants.map(rest => rest)
      dispatch(receiveRestaurants(restaurantArray))
    });
  }
}

export const requestMenu = () => {
  return {
    type: 'REQUEST_MENU'
  }
}

export const receiveMenu = (menuSectionsArray) => {
  return {
    type: 'RECEIVE_MENU',
    payload: menuSectionsArray
  }
}


export const getMenu = (id) => {
  return function(dispatch){
    dispatch(requestMenu());

    ES.RestaurantMenu({apiKey: id}, function(err, res){
    if(err){
      console.log(err);
    }
    dispatch(receiveMenu(res))
    });
  }
}



