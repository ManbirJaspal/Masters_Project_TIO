import React from 'react';
import {Comments} from './Comments';

const PostDetail = ({comments}) => {
 console.log(comments);
  return(
    <div>
      <div className="ui item">
        <div className="item">
          <div className="content">
            <div className="header">
              <h1>{comments[0].post}</h1>
            </div>
            <div className="description">
              <p>Posted By: {comments[0].user_id}</p>
            </div>
          </div>
        </div>
      </div>
      <Comments comments={comments} />
    </div>

  );
}

export default PostDetail;
