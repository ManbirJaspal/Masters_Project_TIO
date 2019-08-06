import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchComment, editComment } from '../../actions';
import CommentForm from './CommentForm';

class CommentEdit extends React.Component {
  componentDidMount() {
    console.log("inside CommentEdit componentDidMount()");
    console.log(this.props.match.params.id);
    this.props.fetchComment(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editComment(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.comment) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <CommentForm
          initialValues={_.pick(this.props.comment, 'comment')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { comment: state.comments[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchComment, editComment }
)(CommentEdit);
