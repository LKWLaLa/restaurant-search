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


    let sectionIsSafe = (section) => {
      return section.items.every(item => item.name.toLowerCase().search(action.payload[0]) === -1)
    }

    let menuIsSafe = (menu) => {
      for(let key in menu){
        let sections = menu[key];
        let verdict = sections.every(section => sectionIsSafe(section))
        return verdict
      }
    }

    let safeMenuArray = state.allMenus.filter(menuIsSafe)
    console.log(safeMenuArray)
    return state

    default:
      return state
  }
}

export default restaurantReducer;