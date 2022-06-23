import React from 'react'
import { Item } from '../../models/Item.model'

type Props = {
  item: Item
}

export const ItemCard = (props: Props) => {
  const { item } = props
  
  return (
    <div className="itemCard">
      <div className="itemCard-email">{item.email}</div>
      <div className="itemCard-username">{item.username}</div>
      <div className="itemCard-description">{item.description}</div>
    </div>
  )
}
