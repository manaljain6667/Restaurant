import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload; //payload was a JavaScript object which contained the various parts of the comment.
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment);
        default:
          return state;
      }
};
// when you say state. concat, what it does is it pushes in the new element into that array, but that will be a new object that will get created. 
//That new object that can return. That way by state itself I'm not mutating in any way. I'm just concating to it. 
//So, the concat is an immutable operation on the state, and that will create a new object and that object I can return from my function here.