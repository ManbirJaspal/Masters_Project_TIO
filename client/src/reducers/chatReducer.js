import _ from 'lodash';
import {
  FETCH_CHAT,
  CHAT_WITH_ID,
  SIGN_OUT,
  CHAT_UNMOUNT
} from '../actions/types';

const INITIAL_STATE = {
  chatService: null,
  chatWithId: null,
}

const EMPTY_STATE = {}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_CHAT:
       console.log("inside chatReducer FETCH_CHAT");
       console.log(action.payload);
       return {...state, ..._.mapKeys(action.payload, 'chat_id')};
    case CHAT_WITH_ID:
         return {...state, chatWithId: action.payload, chatService: 'ON'};
    case SIGN_OUT:
         return EMPTY_STATE;
    case CHAT_UNMOUNT:
         return EMPTY_STATE;
    default:
      return state;
  }
}
