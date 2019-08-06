import React from 'react';
import {connect} from 'react-redux';
import {createPost} from '../../actions';
import PostForm from './PostForm';

class PostCreate extends React.Component {

  onSubmit = (formValues) => {
    console.log(formValues);
    console.log(this.props.match.params.id);
    this.props.createPost(formValues, this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h3>Create a Post</h3>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createPost })(PostCreate);
