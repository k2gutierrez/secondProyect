import React, { Component } from 'react';
import Home from './HomeComponent';
//import logo from './logo.svg';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Routes, Route, Navigate } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }; 
  }
  
  

  render() {

    return (
      <div>
        <Header /> 
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={ <Home 
                                            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                                            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                                            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                                          /> } />
            <Route exact path="/menu" element={ <Menu dishes={this.state.dishes } /> } />
            <Route exact path='/contactus' element={ <Contact /> } />
          </Routes>
        <Footer />
      </div>
    );
  }
  
}

export default Main;
