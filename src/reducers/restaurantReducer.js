const restaurantReducer = (state = {restaurants: [], filteredRestaurants: false, 
  noSafeOptionsMsg: false, checkboxes: {nuts: false, shellfish: false}, restaurantsFetching: false, 
  noResults: false,  errorMsg: false, menuSections: [], menuFetching: false}, action)=> {
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
      return {...state, restaurantsFetching: true, noResults: false, location: action.payload, 
        noSafeOptionsMsg: false, errorMsg: false, filteredRestaurants: false, checkboxes: {nuts: false, shellfish: false}}
    case 'NO_RESULTS':
      return {...state, noResults: true, restaurantsFetching: false, restaurants: []}
    case 'ERROR':
      let status = action.payload[0]
      let msg = action.payload[1]
      return {...state, restaurantsFetching: false, restaurants: [], 
        errorMsg: `${status} error:  ${msg}`}
    case 'RECEIVE_RESTAURANTS':
      return {...state, restaurants: [...action.payload], restaurantsFetching: false}
    case 'REQUEST_MENU':
      return {...state, menuFetching: true}
    case 'RECEIVE_MENU':
      return {...state, menuSections: [...action.payload], menuFetching: false}
    case 'UPDATE_FILTER_CHECKBOXES':
      let term = action.payload
      return {...state, checkboxes: {...state.checkboxes, [term]: !state.checkboxes[term]} }
    case 'FILTER_RESTAURANTS':

      let conditionsArray = action.payload

      let conditionIsMet = (condition, section) => {
        return section.items.every(item => {
          return (item.name.toLowerCase().search(condition) === -1) && (item.description ? item.description.toLowerCase().search(condition) === -1 : true)
        })
      }

      let sectionIsSafe = (section, conditionsArray) => {
        return conditionsArray.every(condition => conditionIsMet(condition, section)) 
      }

      let menuIsSafe = (restaurant) => {
          let menuSections = restaurant.menu;
          let menuVerdict = menuSections.every(section => sectionIsSafe(section, conditionsArray))
          return menuVerdict
      }

      if(conditionsArray.length > 0){
        let safeRestaurants = state.restaurants.filter(menuIsSafe)
        if(safeRestaurants.length === 0){
          return {...state, filteredRestaurants: safeRestaurants, noSafeOptionsMsg: 'no safe options for'}
        }
        return {...state, filteredRestaurants: safeRestaurants}
      }
      return {...state, filteredRestaurants: false} 

    default:
      return state
  }
}

export default restaurantReducer;