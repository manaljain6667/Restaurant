import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};
// when you say state. concat, what it does is it pushes in the new element into that array, but that will be a new object that will get created. 
//That new object that can return. That way by state itself I'm not mutating in any way. I'm just concating to it. 
//So, the concat is an immutable operation on the state, and that will create a new object and that object I can return from my function here.


// when you post a comment, you will first send the comment over to the server, and if the comment is successfully added on the server site 
//and the server sends back a success of the posting of the comment, only then you will add it to the redux store. So, that way, you ensure 
//that the comment posted by the user is actually reflected by changing the data on the server site before even adding it to that redux store.