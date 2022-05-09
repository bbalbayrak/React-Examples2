import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'

export default class BasketList extends Component {
  renderBasket(){
      return(
     <Table striped>
        <thead>
            <tr>
                <th>#</th>
                <th>Category Id</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Units In Stock</th>
                <th>Quantity</th>
                
            </tr>
        </thead>
        <tbody>
            {
                this.props.basker.map(basketItem =>(
                    <tr key={basketItem.product.id}>
                     <td>
                         {basketItem.product.id}
                     </td>
                     <td>
                         {basketItem.product.categoryId}
                     </td>
                     <td>
                         {basketItem.product.productName}
                     </td>
                     <td>
                         {basketItem.product.unitPrice}
                     </td>
                     <td>
                         {basketItem.product.unitsInStock}
                     </td>
                     <td>
                         {basketItem.qunatity}
                     </td>
                     <td>
                    <Button color='danger'  
                    onClick={()=> this.props.removeFromBasket(basketItem.product)}> Remove</Button>
                </td>
                    </tr>
                ))
            }
        </tbody>
     </Table>
      )
  }
  
    render() {
    return (
      <div>
        {this.renderBasket()}
      </div>
    )
  }
}
