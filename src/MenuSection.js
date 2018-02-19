import React from 'react';
import MenuItem from './MenuItem';

const MenuSection = (props) => {
  let {name, items} = props.section 

  const renderItems = () => {
    return items.map(item => <MenuItem item={item} />)
  }

  return (
    <div className="menu-section">
      <h1>{name}</h1>
      <div>{renderItems()}</div>
    </div>
  )
}

export default MenuSection;