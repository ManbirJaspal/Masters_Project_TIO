import React from 'react';
import {connect} from 'react-redux';
import {createGroup} from '../../actions';
import GroupForm from './GroupForm';

class GroupCreate extends React.Component {

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.createGroup(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a Group</h3>
        <GroupForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createGroup })(GroupCreate);
