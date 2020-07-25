import * as ActionTypes from './ActionTypes';
export const Dishes = (state = { 
            isLoading: true,
            errMess: null,
            dishes:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload}; // ... spread operator from ES6.

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: action.payload};

        default:
            return state;
      }
};
//{...state, 
// it will take the current value of the state and then whatever else that I pass in after this will be applied as modifications to the state. 
//So again, the state itself will not be mutated, instead, I take the state, I create a new object from the original state and then make some 
//changes to that object and then return that object. So that's why I am returning an immutable from here. 
//So, the state itself is not going to be mutated here. 