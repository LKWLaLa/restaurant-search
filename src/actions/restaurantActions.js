//import fetch from 'cross-fetch';
const EatStreet = require('eatstreet');
const ES = new EatStreet(process.env.REACT_APP_ES_KEY);

export const requestRestaurants = (location) => {
  return {
    type: 'REQUEST_RESTAURANTS',
    payload: location
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
    dispatch(requestRestaurants(location))

    ES.SearchRestaurants({address:location}, function(err, res){
      if(err){
          console.log(err);
      }
      let restaurantArray = res.restaurants
      let apiKeysArray = restaurantArray.map(rest => rest.apiKey)

      dispatch(getAllMenus(apiKeysArray, restaurantArray))
    });
  }
}


export const getAllMenus = (apiKeysArray, restaurantArray) => {
  return function(dispatch){
    let promises = [];
    apiKeysArray.forEach((key, index) => {
      promises.push(
        new Promise ((resolve, reject) => {
          setTimeout(function(){
            resolve(ES.RestaurantMenu({apiKey: key}, function(err, res){            
              let matchingRestaurant = restaurantArray.find(rest => rest.apiKey === key)
              matchingRestaurant.menu = res            
            }))            
          }, index * 100);
        })
      )
    });
    Promise.all(promises).then(() => 
    dispatch(receiveRestaurants(restaurantArray))
    );
  }
}

export const addAllMenus = (menusArray) => {
  return {
    type: 'ADD_ALL_MENUS',
    payload: menusArray
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


export const filterRestaurants = (conditionsArray) => {
  const varietiesOf = {
    nuts: 'nut|almond|cashew|macadamia|pecan|pigñolia|pistachio|praline|pesto|filbert',
    shellfish: 'shrimp|clam|mussel|lobster|crab|prawn'
  }

  let regexArray = conditionsArray.map(condition => new RegExp(varietiesOf[condition]), 'g')

  return {
    type: 'FILTER_RESTAURANTS',
    payload: regexArray
  }


}



