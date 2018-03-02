import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMenu} from './actions/restaurantActions';
import MenuSection from './MenuSection';
import spinner from './assets/spinner.gif';

class RestaurantMenuContainer extends Component {
  
  componentDidMount(){
    this.props.getMenu(this.props.match.params.id)
  }

  render(){
    let renderMenuSections = () => {
      return this.props.sections.map(section => <MenuSection key={section.apiKey} section={section} />)
    }

    return(
      <div>
        <h1>{this.props.restaurant ? this.props.restaurant.name : 'Menu'}</h1>
        {this.props.menuFetching? <img className="spinner" src={spinner} alt=" loading spinner" /> :
        <section>{renderMenuSections()}</section> }
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {sections: state.menuSections,
    menuFetching: state.menuFetching,
    restaurant: state.restaurants.filter(rest => rest.apiKey == ownProps.match.params.id)[0]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getMenu: (id) => dispatch(getMenu(id))}
}



export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuContainer);

