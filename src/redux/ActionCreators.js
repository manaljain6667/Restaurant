import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
        const newComment = {
          dishId: dishId,
          rating: rating,
          author: author,
          comment: comment
      };
      newComment.date = new Date().toISOString();
      return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addComment(response))) // will be posted into the redux store by dispatching it 
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;                 //if the response is ok then this response will be available to next then
        } 
        else { 
          var error = new Error('Error ' + response.status + ': ' + response.statusText);   //response.status gives the status code like 404  
          error.response = response;
          throw error;
        }
      },
      error => {                   //error handler incase if server does not even respond
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes))) //dishes are obtained, then it'll push the dishes into the redux store here by dispatching that to the dishes.
    .catch(error => dispatch(dishesFailed(error.message)));
}
//The fetchDishes as you see is a function which returns a function which when called will try to fetch the dishes first by setting the isLoading to 
//"True", and so that the spinner can be displayed and after a period of time the dishes are fetched and then added into the application.

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED, 
    payload: errmess
});
//upper two functions returns functions
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
export const fetchleaders = () => (dispatch) => {

  dispatch(leadersLoading(true));
    
  return fetch(baseUrl + 'leaders')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addleaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));
}
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addleaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => (dispatch) => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };
return fetch(baseUrl + 'feedback', {
  method: "POST",
  body: JSON.stringify(newFeedback),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
})
.then(response => {
if (response.ok) {
  return response;
} else {
  var error = new Error('Error ' + response.status + ': ' + response.statusText);
  error.response = response;
  throw error;
}
},
error => {
    throw error;
})
.then(response => response.json())
.then(response => alert("Thank you for your feedback!" + JSON.stringify(response))) // will be posted into the redux store by dispatching it 
.catch(error =>  { console.log('post Feedback', error.message); alert('Your Feedback could not be posted\nError: '+error.message); });
}