import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import { Signup } from "./landing/signup";
import { Students } from "./landing/students";
import  Login  from "./landing/Login";
import  GroupList  from "./groups/GroupList";
import SearchBar from "./landing/SearchBar";
import MainView from "./landing/MainView";
import history from '../history';
import PostCreate from './Posts/PostCreate';
import PostsList from './Posts/PostsList';
import PostEdit from './Posts/PostEdit';
import PostDelete from './Posts/PostDelete';
import CommentsList from './comments/CommentsList';
import CommentEdit from './comments/CommentEdit';
import CommentCreate from './comments/CommentCreate';
import MessageForm from './chat/MessageForm';
import Chat from './chat/Chat';




import GroupCreate from './groups/GroupCreate';
import GroupEdit from './groups/GroupEdit';





const Landing = () => {
  return(
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/posts/new/:id" exact component={PostCreate} />
            <Route path="/groups/new" exact component={GroupCreate} />
            <Route path="/groups" exact component={GroupList} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/students" exact component={Students} />
            <Route path="/login" exact component={Login} />
            <Route path="/posts/:id" exact component={PostsList} />
            <Route path="/posts/edit/:id" exact component={PostEdit} />
            <Route path="/posts/delete/:id" exact component={PostDelete} />
            <Route path="/groups/edit/:id" exact component={GroupEdit} />
            <Route path="/comments/:id" exact component={CommentsList} />
            <Route path="/comments/edit/:id" exact component={CommentEdit} />
            <Route path="/comments/new/:id" exact component={CommentCreate} />
            <Route path="/login/:id" exact component={Login} />
            <Route path="/messageform" exact component={MessageForm} />
            <Route path="/chatwith" exact component={Chat} />
          </Switch>
        </div>
      </Router>
    </div>
        );
        };

export default Landing;
