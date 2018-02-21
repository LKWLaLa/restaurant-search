const restaurantReducer = (state={restaurants: [], restaurantsFetching: false, 
  currentRestaurant: {}, menuSections: [], menuFetching: false}, action)=> {
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
      return {...state, restaurantsFetching: true, location: action.payload}
    case 'RECEIVE_RESTAURANTS':
      return {...state, restaurants: [...action.payload], restaurantsFetching: false}
    case 'REQUEST_MENU':
      return {...state, menuFetching: true}
    case 'RECEIVE_MENU':
      return {...state, menuSections: [...action.payload], menuFetching: false}
    case 'SELECT_CURRENT_RESTAURANT':
      return {...state, currentRestaurant: action.payload}
    case 'FILTER_RESTAURANTS':
      console.log(action.payload)
      return state
    default:
      return state
  }
}

export default restaurantReducer;