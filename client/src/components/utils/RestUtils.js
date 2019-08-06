import React from 'react';
import axios from "axios";
import qs from "qs";
import {Students} from '../landing/students';

export const url = "http://localhost:8082/";

export function getPosts(groupId) {

  axios.get(url + "posts", {params: {
      groupId: groupId  }}).then(
    function(response) {
      console.log(response);
      return response;
    },
    function(error) {
      console.log(error);
    }
  );
}




export function login(email, password) {
  const data = qs.stringify({
    email: email,
    password: password
  });
  console.log("inside restUTILS for login")
     axios.post(url + "login", data)
     .then((getResponse) => {
       console.log("post response");
       console.log(getResponse.data);
     })
     .catch(function(response) {
         console.log(response.body);
       });
}


export function getGroup(groupName) {
  const data = qs.stringify({ group_name: groupName });
  axios.get(url);
}

export function createPost(userid, post) {
  const data = qs.stringify({ user_id: userid, post: post});

axios.post()
}
