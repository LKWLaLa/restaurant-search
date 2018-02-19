import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMenu} from './actions/restaurantActions';
import MenuSection from './MenuSection';

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
        <h1>Hi, I'm a menu page!</h1>
        <section>{renderMenuSections()}</section>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {sections: state.menuSections}
}

const mapDispatchToProps = (dispatch) => {
  return {getMenu: (id) => dispatch(getMenu(id))}
}



export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuContainer);