import fetch from 'cross-fetch';

export const addRestaurants = (restaurants) => {
  return {
    type: 'ADD_RESTAURANTS',
    payload: restaurants
  }
}
