import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchGroup, editGroup } from '../../actions';
import GroupForm from './GroupForm';

class GroupEdit extends React.Component {
  componentDidMount() {
    console.log("inside GroupEdit componentDidMount()");
    console.log(this.props.match.params.id);
    this.props.fetchGroup(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editGroup(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.group) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit Group</h3>
        <GroupForm
          initialValues={_.pick(this.props.group, 'group_name', 'group_description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { group: state.groups[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchGroup, editGroup }
)(GroupEdit);
