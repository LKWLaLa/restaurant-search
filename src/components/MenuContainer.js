import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMenu} from '../actions/restaurantActions';
import MenuSection from './MenuSection';
import spinner from '../assets/spinner.gif';

class MenuContainer extends Component {
  
  componentDidMount(){
    this.props.getMenu(this.props.match.params.id)
  }

  render(){
    let renderMenuSections = () => {
      return this.props.sections.map(
        section => <MenuSection key={section.apiKey} section={section} />
    )}

    let menuInfo = ()=> {
      if (this.props.restaurant){
        let restaurant = this.props.restaurant
        let hours = []
        for(let day in restaurant.hours){
          hours.push(<div>{day}: {restaurant.hours[day][0]}</div>)
        }
        return( 
          <div>
            <h1>{restaurant.name}</h1>       
            <p>{restaurant.streetAddress}</p>
            <p>{restaurant.phone}</p>
            <div>
              <h2>Hours: </h2>
              {hours}
            </div>
          </div>
        ) 
      }
    return(<h1>Menu</h1>)
  }

    return(
      <div>
        {menuInfo()}
        {this.props.menuFetching ? 
          <img className="spinner" src={spinner} alt=" loading spinner" /> :
          <section>{renderMenuSections()}</section> }
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {sections: state.menuSections,
    menuFetching: state.menuFetching,
    restaurant: state.restaurants.filter(rest => rest.apiKey === ownProps.match.params.id)[0]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getMenu: (id) => dispatch(getMenu(id))}
}



export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

