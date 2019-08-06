import React from 'react'
import { Button, Header, Image, Modal, Form, TextArea } from 'semantic-ui-react';


class CreatePostDialogue extends React.Component  {
        state = {
          title: '',
          text: ''
        };

  onInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  onClickHandler = () => {
  this.props.onPostSubmit(this.state.text, this.state.title );

  }

  render() {
    return(
      <Modal trigger={<Button>CREATE POST</Button>} centered={false}>
        <Modal.Header>Create a post</Modal.Header>
        <Modal.Content>

          <Modal.Description>

            <Form >
              <TextArea onChange={this.onInputChange} value={this.state.title} name='title' rows={1} placeholder='Title' />
              <TextArea onChange={this.onInputChange} value={this.state.text} name='text' placeholder='Text' />
            </Form>
          </Modal.Description>
          <button onClick={this.onClickHandler} floated="right" color="blue">POST</button>
        </Modal.Content>
      </Modal>
  );
  }

}

export default CreatePostDialogue;
