import React,{Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

//withrouter is required for configuring my React Component to connect to Redux.

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

// so we can dispatch that func by using dispatch and in order to do the dispatch, I need to map it in the DispatchToProp so that dispatch 
//dishes becomes available for my main component to make use of. So, in the main component I need to fetch the dishes.

class Main extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  //this will ensure that when my mainComponent is mounted, then I'll go and fetch all these from that server. 

  render() {
    const HomePage = () => {
      return(
        <Home 
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
      />
      );
    };
    const Aboutus=()=>{
      return(
        <About leaders={this.props.leaders}/>
      )
    }

    return (
      <div>
        <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              {/* When you have a URL ending with /home, then this will route me to this particular component 
                  that is going to act as the view here. And the components name would be HomePage. */}
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              {/* exact here that means that the path should exactly match this with nothing else, beyond menu */}
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route path='/aboutus' component={Aboutus}/>
              <Redirect to="/home" />
              {/* if the URL part does not match anything then you will redirect it to the home component. */}
            </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

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