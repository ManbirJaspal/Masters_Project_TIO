import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'


export const Comments = ({comments}) => {

  const renderComments = comments.map((comment) => {
    return (
      <Comment.Group size='massive'>
        <Header as='h3' dividing>

        </Header>
        <Comment>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>{comments[0].user_id}</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>


      </Comment.Group>)
  });
  return (
    <div>{renderComments}</div>
  )
}
// export const Comments = ({comments}) => {
//
//
//   const renderComments = comments.map((comment) => {
//     return <div>{comment.comment}</div>;
//   });
//   return (
//     <div>{renderComments}</div>
//   )
