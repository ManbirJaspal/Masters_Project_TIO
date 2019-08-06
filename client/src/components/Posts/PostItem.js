import React from "react";
import {Students} from '../landing/students';


const PostItem = ({id, text, user, onPostSelect, onGetComments}) => {

      return (
      <div className="ui item" onClick={() => onPostSelect(id, onGetComments)}>
        <div className="item">
          <div className="content">
            <div className="header">
              <h1>{text}</h1>
            </div>
            <div className="description">
              <p>Posted By: {user}</p>
            </div>
          </div>
        </div>
    </div>
  );
};



export default PostItem;
