import React from 'react';
import {connect} from 'react-redux';
import {createComment} from '../../actions';
import CommentForm from './CommentForm';

class CommentCreate extends React.Component {

  onSubmit = (formValues) => {
    console.log(formValues);
    console.log(this.props.match.params.id);
    this.props.createComment(formValues, this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h3>Create a Comment</h3>
        <CommentForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createComment })(CommentCreate);
