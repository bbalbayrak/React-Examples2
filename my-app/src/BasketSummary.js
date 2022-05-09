import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge} from 'reactstrap'

export default class BasketSummary extends Component {
  render() {
    return (
      <div>
        <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
          >
            Basket - {this.props.basket.length}
          </DropdownToggle>
          <DropdownMenu right>
              {
                  this.props.basket.map(basketItem => (
                    <DropdownItem key={basketItem.product.id}>
                    <Badge color='danger' onClick={()=> this.props.removeFromBasket(basketItem.product)} >X</Badge>
                    {basketItem.product.productName}
                    <Badge color='success'>{basketItem.quantity} </Badge>
                  </DropdownItem>
                  
                  )) 
              }
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link to="basket" >Go to Basket </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
}
