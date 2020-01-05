import React from "react";
import CommentCreate from './CommentCreate';
import { connect } from "react-redux";
import { fetchComments, clearComments } from '../../actions';
import { Link } from 'react-router-dom';


class CommentsList extends React.Component {

  componentDidMount() {
    this.props.fetchComments(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  renderAdmin = (comment) => {
    console.log("Inside renderADMIN () IN commentList");
    console.log(comment.comment_user_id, this.props.currentUserId);
    if (comment.comment_a_id === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/comments/edit/${comment.comment_id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/comments/delete/${comment.comment_id}`}
            className="ui button negative"
            >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    console.log(this.props.comments);
    return this.props.comments.map(comment => {
      return (
        <div className="item" key={comment.comment_id} >
          {this.renderAdmin(comment)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <div className="description">{comment.comment}</div>
          </div>
          <div class="extra content">
            <span>created by:      {comment.comment_user_id}</span>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn && this.props.mod == null) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link
            to={`/comments/new/${this.props.match.params.id}`}
            className="ui grey basic button">Create a comment
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="ui container">
          <div className="ui celled list">{this.renderList()}</div>
          {this.renderCreate()}
        </div>
        <Link to='/groups' className="ui grey basic button">Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: Object.values(state.comments),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    mod: state.auth.mod
  };
};

export default connect(mapStateToProps, { fetchComments, clearComments })(CommentsList);
