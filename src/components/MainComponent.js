import React,{Component} from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes : DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
  }
  render() {
    return (
      <div>
        <Header />
        <Menu dishes={this.state.dishes}
              onClick={(dishId)=>this.onDishSelect(dishId)}/>
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
{/* ṭhis arrow function helps us to select out all those dishes for which the dishId matches 
      the selectedDish, which contains the dishId of the selectedDish.  */}
{/* this filter function will give the sub array of the dishes for which the sub-array contains are rather, 
     constrained part of the array, or just the elements from the array, for which this property, the dishId matches selected dish.  */}
        <Footer />
      </div>
    );
  }
}
export default Main;