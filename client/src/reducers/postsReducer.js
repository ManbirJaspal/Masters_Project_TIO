import _ from 'lodash';
import {
  CREATE_POST,
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST,
  EDIT_POST,
  CLEAR_POSTS
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_POSTS:
       console.log("inside postsReducer FETCH_POSTS");
       console.log(action.payload);
       return {...state, ..._.mapKeys(action.payload, 'post_id')};
    case FETCH_POST:
      console.log(action.payload);
      return {...state, [action.payload[0].post_id]: action.payload };
    case CREATE_POST:
      return {...state, [action.payload.id]: action.payload };
    case EDIT_POST:
      console.log("inside postsReducer EDIT_POST");
      console.log(action.payload);
      return {...state, [action.payload.post_id]: action.payload };
      case CLEAR_POSTS:
        return INITIAL_STATE;
    case DELETE_POST:
      return _.omit(state, action.payload) // doesnt change the original state object. it creates a copy like above by itself.
    default:
      return state;
  }
}

//mapKeys is a function from lowdash that takes an array and returns an object.
