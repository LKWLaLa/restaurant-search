const restaurantReducer = (state={restaurants: [], isFetching: 'false', menuItems: []}, action)=> {
  console.log(action.type)
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
    console.log("this is happening")
      return {...state, isFetching: 'true'}
    case 'RECEIVE_RESTAURANTS':
      return {restaurants: [...action.payload], isFetching: 'false'}
    case 'RECEIVE_MENU':
      return {menuItems: [...action.payload]}
    default:
      return state
  }
}

export default restaurantReducer;