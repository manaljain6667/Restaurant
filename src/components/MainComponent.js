import React,{Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes : DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
  
  render() {
    const HomePage = () => {
      return(
          <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    return (
      <div>
        <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              {/* When you have a URL ending with /home, then this will route me to this particular component 
                  that is going to act as the view here. And the components name would be HomePage. */}
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route exact path='/contactus' component={Contact} />
              {/* exact here that means that the path should exactly match this with nothing else, beyond menu */}
              <Route path='/menu/:dishId' component={DishWithId} />
              <Redirect to="/home" />
              {/* if the URL part does not match anything then you will redirect it to the home component. */}
            </Switch>
        <Footer />
      </div>
    );
  }
}
export default Main;

//component={Menu}
// this approach of specifying the component will not allow me to pass in any props to the menu component. 
//If I need to pass in props to a component through the specification of the route here, then I will have to pass that in as a function component.


/* <Menu dishes={this.state.dishes}
              onClick={(dishId)=>this.onDishSelect(dishId)}/>
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
{/* ṭhis arrow function helps us to select out all those dishes for which the dishId matches 
      the selectedDish, which contains the dishId of the selectedDish.  */
{/* this filter function will give the sub array of the dishes for which the sub-array contains are rather, 
     constrained part of the array, or just the elements from the array, for which this property, the dishId matches selected dish.  */} 