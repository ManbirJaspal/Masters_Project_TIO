import React from 'react';
import {connect} from 'react-redux';
import {chatWithID} from '../../actions';
import ChatWithForm from './ChatWithForm';

class Chat extends React.Component {

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.chatWithID(formValues);
  }

  render() {
    return (
      <div>
        <h3>Enter ID To Start Chatting</h3>
        <ChatWithForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { chatWithID })(Chat);
