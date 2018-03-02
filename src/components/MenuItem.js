import React from 'react';

const MenuItem = (props) => {
  let {name, description, basePrice} = props.item
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${basePrice}</p>
    </div>
  )
}

export default MenuItem;