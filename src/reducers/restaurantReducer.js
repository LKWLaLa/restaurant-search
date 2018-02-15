const restaurantReducer = (state={restaurants: []}, action)=> {
  switch (action.type){
    case 'ADD_RESTAURANTS':
      return {restaurants: [...action.payload]}
    default:
      return state
  }
}

export default restaurantReducer;