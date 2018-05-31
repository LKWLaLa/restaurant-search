const restaurantReducer = (state = {restaurants: [], filteredRestaurants: false, 
  noSafeOptionsMsg: false, checkboxes: {nuts: false, shellfish: false}, maximum: 0, restaurantsFetching: false, 
  noResults: false,  errorMsg: false, menuSections: [], menuFetching: false}, action)=> {
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
      return {...state, restaurantsFetching: true, noResults: false, location: action.payload, maximum: 0,
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
    case 'UPDATE_MAXIMUM':
      return {...state, maximum: action.payload}  
    case 'FILTER_RESTAURANTS':

      let conditionsArray = action.regex
      let maxValue = action.maxValue

      let unsafeItems = (condition, section) => {
        return section.items.filter(item => {
          return (item.name.toLowerCase().match(condition) !== null) || (item.description ? item.description.toLowerCase().match(condition) !== null : false)
        })
      }

      let sectionAllergens = (section, conditionsArray) => {
        let items = conditionsArray.map(condition => unsafeItems(condition, section))
        return [].concat.apply([], items)
      }

      let menuAllergens = (restaurant) => {
        let menuSections = restaurant.menu;
        let riskyItems = menuSections.map(section => sectionAllergens(section, conditionsArray))
        return [].concat.apply([], riskyItems)
      }

      let menuIsSafe = (restaurant) => {
        return menuAllergens(restaurant).length <= parseInt(maxValue, 10)
      }

      if(conditionsArray.length > 0){
        //Make a deep clone, so menuAllergens (below) does not add a property to state.restaurants
        let safeRestaurants = JSON.parse(JSON.stringify(state.restaurants)).filter(menuIsSafe)
        if(safeRestaurants.length === 0){
          return {...state, filteredRestaurants: safeRestaurants, noSafeOptionsMsg: 'no safe options for'}
        }
        safeRestaurants.forEach(restaurant => {
          restaurant.menuAllergens = menuAllergens(restaurant)
        })
        return {...state, filteredRestaurants: safeRestaurants}
      }
      return {...state, filteredRestaurants: false, noSafeOptionsMsg: false} 

    default:
      return state
  }
}

export default restaurantReducer;