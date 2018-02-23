const restaurantReducer = (state={restaurants: [], restaurantsFetching: false, 
  allMenus: [], menuSections: [], menuFetching: false}, action)=> {
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
      return {...state, restaurantsFetching: true, location: action.payload}
    case 'RECEIVE_RESTAURANTS':
      return {...state, restaurants: [...action.payload], restaurantsFetching: false}
    case 'ADD_ALL_MENUS':
      return {...state, allMenus: action.payload} 
    case 'REQUEST_MENU':
      return {...state, menuFetching: true}
    case 'RECEIVE_MENU':
      return {...state, menuSections: [...action.payload], menuFetching: false}
    case 'FILTER_RESTAURANTS':
      return state
    default:
      return state
  }
}

export default restaurantReducer;