const restaurantReducer = (state={restaurants: [], isFetching: 'false'}, action)=> {
  console.log(action.type)
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
    console.log("this is happening")
      return {...state, isFetching: 'true'}
    case 'RECEIVE_RESTAURANTS':
      return {restaurants: [...action.payload], isFetching: 'false'}
    default:
      return state
  }
}

export default restaurantReducer;