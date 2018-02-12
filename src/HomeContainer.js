import React, {Component} from 'react';
import RestaurantsContainer from './RestaurantsContainer';
import Search from './Search';


class HomeContainer extends Component {

  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Restaurants</h1>
        </header>
        <Search />
        <RestaurantsContainer restaurants={this.props.restaurants}/>
      </div>
    )
  }
}

export default HomeContainer;
