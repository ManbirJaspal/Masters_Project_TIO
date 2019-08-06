import {SIGN_IN, SIGN_OUT, MOD_SIGN_IN} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  mod: null,
  mod_id: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGN_IN:
        return {...state, isSignedIn: true, userId: action.payload};
      case SIGN_OUT:
        return {...state, isSignedIn: false, userId: null, mod: null, mod_id: null};
      case MOD_SIGN_IN:
          return {...state, isSignedIn: true, mod: true, mod_id: action.payload};
      default:
        return state;
    }
};
