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
      let restaurantArray = res.restaurants.map(rest => rest)
      let apiKeysArray = res.restaurants.map(rest => rest.apiKey)
      dispatch(receiveRestaurants(restaurantArray))
      dispatch(getAllMenus(apiKeysArray))
    });
  }
}


export const getAllMenus = (apiKeysArray) => {
  return function(dispatch){
    let menusArray = [];

    apiKeysArray.forEach((key, index) => {
        return setTimeout(function(){
          ES.RestaurantMenu({apiKey: key}, function(err, res){
            console.log("making a call")
            if(err){
              alert(err)
            }
            else{ 
              menusArray.push(res)
            }
          })            
        }, index * 100);
    });
    dispatch(addAllMenus(menusArray))
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

  let regexArray = conditionsArray.map(condition => new RegExp(varietiesOf[condition]))

  return {
    type: 'FILTER_RESTAURANTS',
    payload: regexArray
  }


}



