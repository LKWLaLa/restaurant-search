import React from 'react';

const MenuSection = (props) => {
  let {name, items} = props.section 

  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

export default MenuSection;