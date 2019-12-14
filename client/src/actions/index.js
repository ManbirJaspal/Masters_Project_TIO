import history from '../history';
import { url } from "../components/utils/RestUtils";
import axios from "axios";
import qs from 'qs';

import {
  SIGN_IN, SIGN_OUT, MOD_SIGN_IN,
  CREATE_POST,
  GET_GROUPS,
  FETCH_POSTS,
  CREATE_GROUP,
  FETCH_POST,
  EDIT_POST,
  FETCH_GROUP,
  EDIT_GROUP,
  DELETE_POST,
  GET_COMMENTS,
  CREATE_COMMENT,
  FETCH_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  CLEAR_POSTS,
  CLEAR_COMMENTS,
  FETCH_CHAT,
  SEND_MESSAGE,
  CHAT_WITH_ID,
  CHAT_UNMOUNT,
  REPORT_NOTIFICATION,

} from './types';

//LOGIN ACTIONS

export const signIn = (id, mod) => (dispatch) => {
  console.log("inside signIn action", id, mod)
  if (mod === true) {
    console.log("inside mod_signin action");
    dispatch({
      type: MOD_SIGN_IN,
      payload: id, mod
    })
  } else {
    dispatch({
      type: SIGN_IN,
      payload: id
    })
  }

  history.push('/groups');
};


export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};


//GROUP RELATED ACTIONS

// ****************************************************************************

export const createGroup = formValues => async (dispatch, getState) => {

  console.log("inside createGroup actions");
  const {userId} = getState().auth;

  const createGroup_Data = qs.stringify({
    group_description: formValues.group_description,
    user_id: userId,
    title: formValues.group_name
  });

  await axios.post(url + "groups", createGroup_Data)
  .then(response => {
    console.log('Group created at actions.');
    console.log(response.data);
    dispatch({
      type: CREATE_GROUP,
      payload: response.data
    })
    history.push(`/groups`);
  },
  function(error) {
    console.log(error)
  }
);
}

export const getGroups = () => async dispatch => {
  console.log("inside getGroups in actions");
  await axios.get(url + "groups")
  .then(response => {
    console.log(response.data);

    dispatch({
      type: GET_GROUPS,
      payload: response.data
    })
  },
  function(error) {
    console.log(error)
  }
);
};

export const fetchGroup = (id) => async dispatch => {
  console.log("inside fetchGroup in actions");
  console.log(id);
  await axios.get(url + "group", {params: {
    group_id: id }
  })
  .then(response => {
    console.log(response.data);
    dispatch({
      type: FETCH_GROUP,
      payload: response.data
    })
  }, function(error) {
    console.log(error);
  });
}

export const editGroup = (id, formValues) => async dispatch => {
  console.log("inside editGroup in actions");
  console.log(id);

  const update_GroupData = qs.stringify({
    group_description: formValues.group_description,
    group_title: formValues.group_name,
    group_id: id
  });

  await axios.put(url + "group", update_GroupData)
  .then(response => {
    console.log(response.data);
    dispatch({
      type: EDIT_GROUP,
      payload: response.data
    })
    history.push("/groups");
  }, function(error) {
    console.log(error);
  });
}

// ****************************************************************************

export const reportNotification = (title) => async (dispatch) => {
  console.log("inside report notification actions");

  const reportNotification_Data = qs.stringify({
    title: title
  });

  await axios.post(url + "send", reportNotification_Data)
  .then(response => {
    console.log('email notification sent to moderator');
    console.log(response.data);
  },
  function(error) {
    console.log(error)
  }
);
}

// POST RELATED ACTIONS

export const createPost = (formValues, id) => async (dispatch, getState) => {
  console.log("inside createPost actions");
  const {userId} = getState().auth;
  const createPost_Data = qs.stringify({
    group_id: id,
    description: formValues.description,
    user_id: userId,
    title: formValues.title
  });

  await axios.post(url + "posts", createPost_Data)
  .then(response => {
    console.log('Post created at actions.');
    console.log(response.data);
    dispatch({
      type: CREATE_POST,
      payload: response.data
    })
    history.push(`/posts/${id}`);
  },
  function(error) {
    console.log(error)
  }
);
}




export const fetchPosts = (id) => async dispatch => {
  console.log("inside fetchPosts in actions");
  await axios.get(url + "posts", {params: {
    groupId: id }
  })
  .then(response => {
    console.log(response.data);
    dispatch({
      type: FETCH_POSTS,
      payload: response.data
    })
  }, function(error) {
    console.log(error);
  });
}


export const fetchPost = (id) => async dispatch => {
  console.log("inside fetchPost in actions");
  console.log(id);
  await axios.get(url + "post", {params: {
    post_id: id }
  })
  .then(response => {
    console.log(response.data);
    dispatch({
      type: FETCH_POST,
      payload: response.data
    })
  }, function(error) {
    console.log(error);
  });
}

export const editPost = (id, formValues) => async dispatch => {
  console.log("inside editPost in actions");
  console.log(id);

  const update_PostData = qs.stringify({
    description: formValues.description,
    title: formValues.title,
    post_id: id
  });

  await axios.put(url + "post", update_PostData)
  .then(response => {
    console.log(response.data);
    dispatch({
      type: EDIT_POST,
      payload: response.data
    })
    history.push("/groups");
  }, function(error) {
    console.log(error);
  });
}

export const deletePost = (id) => async dispatch => {
  console.log("inside deletePost in actions");
  console.log(id);
  await axios.delete(url + "post", {params: {
    post_id: id }
  })
  .then(response => {

    dispatch({
      type: DELETE_POST,
      payload: id
    })
    history.push('/groups');
  }, function(error) {
    console.log(error);
  })
}

export const clearPosts = () => (dispatch) => {
  console.log("inside clearPost() in action")
  dispatch({
    type: CLEAR_POSTS
  })
};


// ****************************************************************************


//COMMENT RELATED ACTIONS


export const createComment = (formValues, id) => async (dispatch, getState) => {
  console.log("inside createComment actions");
  const {userId} = getState().auth;
  const createComment_Data = qs.stringify({
    post_id: id,
    comment: formValues.comment,
    comment_user_id: userId
  });

  await axios.post(url + "comments", createComment_Data)
  .then(response => {
    console.log('Comment created at actions.');
    console.log(response.data);
    dispatch({
      type: CREATE_COMMENT,
      payload: response.data
    })
    history.push(`/comments/${id}`);
  },
  function(error) {
    console.log(error)
  }
);
}

export const fetchComments = (id) => async dispatch => {
  console.log("inside fetchComments in actions");
  await axios.get(url + "comments", {params: {
    post_id: id }
  })
  .then(response => {
    console.log(response.data);
    dispatch({
      type: GET_COMMENTS,
      payload: response.data
    })
  }, function(error) {
    console.log(error);
  });
}

export const clearComments = () => (dispatch) => {
  console.log("inside clearComments() in action")
  dispatch({
    type: CLEAR_COMMENTS
  })
};

export const fetchComment = (id) => async dispatch => {
  // console.log("inside fetchPost in actions");
  // console.log(id);
  // await axios.get(url + "post", {params: {
  //   post_id: id }
  // })
  // .then(response => {
  //   console.log(response.data);
  //   dispatch({
  //     type: FETCH_POST,
  //     payload: response.data
  //   })
  // }, function(error) {
  //   console.log(error);
  // });
}

export const editComment = (id, formValues) => async dispatch => {
  // console.log("inside editPost in actions");
  // console.log(id);
  //
  // const update_PostData = qs.stringify({
  //   description: formValues.description,
  //   title: formValues.title,
  //   post_id: id
  // });
  //
  // await axios.put(url + "post", update_PostData)
  // .then(response => {
  //   console.log(response.data);
  //   dispatch({
  //     type: EDIT_COMMENT,
  //     payload: response.data
  //   })
  //   history.push("/groups");
  // }, function(error) {
  //   console.log(error);
  // });
}

// ****************************************************************************


//CHAT RELATED ACTIONS

export const fetchChat = (chat_mod_id, chat_user_id) => async (dispatch, getState) => {
  console.log("inside fetchChat in actions");

  var {userId} = getState().auth;
  var {mod} = getState().auth;
  var {mod_id} = getState().auth;
  var {chatWithId} = getState().chats;

  if(mod) {
    await axios.get(url + "getmessages", {params: {
      chat_user_id : chatWithId,
      chat_mod_id : mod_id
    }
    })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: FETCH_CHAT,
        payload: response.data
      })
    }, function(error) {
      console.log(error);
    });

  } else {
    await axios.get(url + "getMessages", {params: {
      chat_user_id : userId,
      chat_mod_id : chatWithId
    }
    })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: FETCH_CHAT,
        payload: response.data
      })
    }, function(error) {
      console.log(error);
    });
  }
}

export const chatWithID = (formValues) => async dispatch => {
    dispatch({
      type:CHAT_WITH_ID,
      payload: formValues.chat_id
    });
    history.push('/messageform');
}


export const sendMessage = (message) => async (dispatch, getState) => {
  console.log("inside sendMessage actions");
  var {userId} = getState().auth;
  var {mod} = getState().auth;
  var {mod_id} = getState().auth;
  var {chatWithId} = getState().chats;
  var createdBy = '';
  var createMessage_data;

  if(mod) {
    createdBy = 'mod';
     createMessage_data = qs.stringify({
            message : message,
            chat_user_id : chatWithId,
            chat_mod_id : mod_id,
            created_by : createdBy
    });
  } else {
    createdBy = 'student';
     createMessage_data = qs.stringify({
            message : message,
            chat_user_id : userId,
            chat_mod_id : chatWithId,
            created_by : createdBy
    });
  }

  await axios.post(url + "chaton", createMessage_data)
  .then(response => {
    console.log('Message sent at actions.');
    console.log(response.data);
    dispatch({
      type: SEND_MESSAGE,
      payload: response.data
    })

  },
  function(error) {
    console.log(error)
  }
);
}

export const chatUnmount = () => async dispatch => {
    dispatch({
      type:CHAT_UNMOUNT
    });
    history.push('/groups');
}
