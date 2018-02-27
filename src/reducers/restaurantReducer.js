const restaurantReducer = (state={restaurants: [], filteredRestaurants: false, restaurantsFetching: false, 
   menuSections: [], menuFetching: false}, action)=> {
  switch (action.type){
    case 'REQUEST_RESTAURANTS':
      return {...state, restaurantsFetching: true, location: action.payload, filteredRestaurants: false}
    case 'RECEIVE_RESTAURANTS':
      return {...state, restaurants: [...action.payload], restaurantsFetching: false}
    case 'REQUEST_MENU':
      return {...state, menuFetching: true}
    case 'RECEIVE_MENU':
      return {...state, menuSections: [...action.payload], menuFetching: false}
    case 'FILTER_RESTAURANTS':

      let conditions = action.payload

      let sectionIsSafe = (section, conditions) => {
        return conditions.every(condition => {
          return section.items.every(item => {
            return (item.name.toLowerCase().search(condition) === -1) && (item.description ? item.description.toLowerCase().search(condition) === -1 : true)
          })
        })
      }

      let menuIsSafe = (restaurant) => {
          let menuSections = restaurant.menu;
          let menuVerdict = menuSections.every(section => sectionIsSafe(section, conditions))
          return menuVerdict
      }

      if(conditions.length > 0){
        let safeRestaurants = state.restaurants.filter(menuIsSafe)
        return {...state, filteredRestaurants: safeRestaurants}
      }
      return {...state, filteredRestaurants: false} 

    default:
      return state
  }
}

export default restaurantReducer;