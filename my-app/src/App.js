import { Container,Row,Col } from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import React, { Component } from 'react';
import './App.css';
import {  Route ,Switch} from 'react-router-dom';
// import {alertify} from "alertify";
import NotFound from './NotFound';
import BasketList from './BasketList';
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';


export default class App extends Component {

state = { currentCategory:" " , products:[], basket:[]

}
  
  changeCategory = (category) => {
    this.setState({currentCategory: category.categoryName})
    this.getProducts(category.id);

  };

  componentDidMount(){
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if(categoryId){
      url += "?categoryId=" + categoryId;
    }
    
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({products:data}))
  };

  addToBasket = (product) => {
    let newBasket = this.state.basket;
    var addedItem = newBasket.find(c => c.product.id === product.id);
    if(addedItem){
      addedItem.quantity += 1;
    }else{
      newBasket.push({product:product, quantity:1});
    }
    // newBasket.push({product:product, quantity:1});
     //this.setState({basket: newBasket});
     this.setState({basket: newBasket});

      // alertify.success(product.productName + " Added to basket"); its not working
  }

  removeFromBasket= (product)=> {
    var newBasket = this.state.basket.filter(b=>b.product.id!==product.id)
    let deletedItem = this.state.basket; 
    if(deletedItem){
      deletedItem.quantity -= 1; //this if-else block is not working
    }else{
      newBasket.delete({product:product,quantity:1})
    }
    this.setState({basket:newBasket})
  }
  render(){
    return (
      <div> 
        <Container>
          
          <Navi basket={this.state.basket}
          removeFromBasket={this.removeFromBasket}/>
          
          <div className='category'>
         <Row>
          <Col xs="3">
              <CategoryList currentCategory = {this.state.currentCategory} 
              changeCategory={this.changeCategory} 
              title="Category List"/>
            </Col>
          </Row>
          </div>

          <Row>
            <div className='product'>
          <Row>
          <Col xs="9">
            <Switch>
              <Route exact path='/' render = { props => (
                <ProductList
                {...props}
              products = {this.state.products}
              addToBasket = {this.addToBasket}
               currentCategory = {this.state.currentCategory} 
               title="Product List"/>
              )

              }/> 
              <Route exact path='/basket' render = { props => (
                <BasketList
                {...props}
              basker = {this.state.basket}
              removeFromBasket = {this.removeFromBasket}
              
              />
              )

              }/>
              <Route path='/form1' component={FormDemo1}></Route>
              <Route path='/form2' component={FormDemo2}></Route>
            <Route component={NotFound}></Route>
            </Switch>
            
              
            </Col>
            </Row>  
            </div>
            
          </Row>
        </Container>
      </div>
    );
  }
}

