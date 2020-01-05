import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import qs from 'qs';
import { url } from "../utils/RestUtils";
import { sendMessage, fetchChat, chatUnmount } from '../../actions';
import { connect } from "react-redux";
import history from '../../history';




class MessageForm extends React.Component {
timeout = 0;

  constructor(props) {
      super(props);
      this.state = {
          message: ''
      };
  }

  componentDidMount() {
    this.props.fetchChat();
    this.timeout = setInterval(this.fetchMessages, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
    this.props.chatUnmount();
  }

  fetchMessages = () => {
    if(this.props.chatState === 'ON')
    this.props.fetchChat();
  }

  handleSubmit() {
    this.props.sendMessage(this.state.message);

  }

  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
      console.log(this.state);
  };

  renderList() {
    const left = {
        textAlign : 'left',
        color: 'blue'
      };

      const right = {
        textAlign : 'right',
        color: 'red'
      };

    return this.props.chats.map(chat => {
      if(chat.message != null)
        if(chat.created_by === "mod") {
          console.log("inside created_by mod");
          return (
            <div className="item" key={chat.chat_id}>
              <div className="content">
              <p style={right}>{chat.created_by}: {chat.message}</p>
              </div>
            </div>
          )
        }
   else if (chat.created_by === "student") {
    console.log("inside created_by not mod");
    return (
      <div className="item" key={chat.chat_id}>
        <div className="content">
        <p style={left}>{chat.created_by}: {chat.message}</p>
        </div>
      </div>
    )
  }
})
}

  render(){
    return(
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Chat-Box
            </Header>
            <div className="ui celled list">{this.renderList()}</div>
            <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Enter Message...'
                  type='text'
                  name="message" id="message"
                  onChange={this.handleChange.bind(this)}
                />
                <Button color='teal' fluid size='large' type='submit'>
                  Send
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Button color='teal' fluid size='large' onClick={() => {this.props.chatUnmount()}}>
          Stop Chat Session
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chats: Object.values(state.chats),
    chatState: state.chats.chatService,
    mod: state.auth.mod,
    chatWithId: state.chats.chatWithId
  };
};

export default connect(mapStateToProps, { sendMessage, fetchChat, chatUnmount })(MessageForm);
