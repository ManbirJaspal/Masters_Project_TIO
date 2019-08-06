import _ from 'lodash';
import {
  GET_COMMENTS,
  CREATE_COMMENT,
  FETCH_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  CLEAR_POSTS
} from '../actions/types';


const INITIAL_STATE = {}
export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case GET_COMMENTS:
       console.log("inside GET_COMMENTS in commentsREducer");

       return {...state, ..._.mapKeys(action.payload, 'comment_id')};
    case CREATE_COMMENT:
      return {...state, [action.payload.id]: action.payload };
    case FETCH_COMMENT:
      return {...state, [action.payload[0].comment_id]: action.payload };
    case EDIT_COMMENT:
      return {...state, [action.payload.id]: action.payload };
      case CLEAR_POSTS:
        return INITIAL_STATE;
    // case DELETE_POST:
    //   return _.omit(state, action.payload) // doesnt change the original state object. it creates a copy like above by itself.
    default:
      return state;
  }
}

//mapKeys is a function from lowdadsh that takes an array and returns an object.
