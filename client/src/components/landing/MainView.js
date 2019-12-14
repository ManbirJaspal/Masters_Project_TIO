import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import GroupList from '../groups/GroupList';
import PostsList from '../Posts/PostsList';
import PostDetail from '../Posts/PostDetail';
import axios from 'axios';
import { url, getPosts } from "../utils/RestUtils";
import Header from '../Header';
import { getGroups } from '../../actions';

class MainView extends React.Component {
  state = {grpSearchTerm:'',
            groups: [],
            posts: [],
            comments: [],
            viewState: 'groups'
            };

  componentDidMount() {
      console.log(this.props);
      this.props.getGroups();
            }

  renderList() {
    return this.props.groups.map(group => {
      return (
        <div className="item" key={group.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            <div className="description">{group.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Groups</h2>
        <div className="ui celled list">{this.renderList()}</div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: Object.values(state.groups)
  };
};

export default connect(mapStateToProps,{getGroups})(MainView);
