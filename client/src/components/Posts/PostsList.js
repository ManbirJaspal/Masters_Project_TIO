import React from "react";
import PostItem from "./PostItem";
import PostCreate from './PostCreate';
import { connect } from "react-redux";
import { fetchPosts,clearPosts, reportNotification } from '../../actions';
import { Link } from 'react-router-dom';
import style from '../../style/style.css';



class PostsList extends React.Component {

  componentDidMount() {
    this.props.fetchPosts(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }


  reportNotification = () => {
    this.props.reportNotification(this.props.match.params.id);
  }
  renderAdmin = (post) => {
    console.log("Inside renderADMIN () IN postList");
    console.log(post.post_user_id, this.props.currentUserId);
    if (post.post_user_id == this.props.currentUserId) {
      return (
        <div style={{textAlign: "right"}} className="right floated content">
          <Link to={`/posts/edit/${post.post_id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/posts/delete/${post.post_id}`}
            className="ui button negative"
          >
            Delete
          </Link>
          </div>
      );
    }
    if(this.props.mod === true && post.alert === "true") {
      return (
        <div className="right floated content">
          <Link to={`/posts`} className="ui button" style={{color: "red"}}>
            Alert
          </Link>
        </div>
      );
    }
  }

    renderList() {
      console.log(this.props.posts);
     return this.props.posts.map(post => {
       return (
         <div className="ui segment " key={post.post_id} >
           {this.renderAdmin(post)}
           <div className="content">
             <div>
               <h3><Link  to={`/comments/${post.post_id}`} className="header">
                 {post.title}
               </Link></h3>
               <div className="description">
                 <p>{post.description}</p>
               </div>
               <div class="extra content">
                 <span>Posted by:      {post.post_user_id}</span>
               </div>
               <button onClick={this.reportNotification}>Report</button>

             </div>
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
           to={`/posts/new/${this.props.match.params.id}`}
           className="ui grey basic button">Create a post
         </Link>
       </div>
     );
   }
 }


    render() {
    return (
   <div>
     <div  className="ui container">
       <div className="ui raised segment">{this.renderList()}</div>
       {this.renderCreate()}
     </div>
     <Link to='/groups' className="ui grey basic button">Go Back</Link>
   </div>
            );
         }

  }

  const mapStateToProps = state => {
    return {
      posts: Object.values(state.posts),
      currentUserId: state.auth.userId,
      isSignedIn: state.auth.isSignedIn,
      mod: state.auth.mod
    };
  };


export default connect(mapStateToProps, { fetchPosts, clearPosts, reportNotification  })(PostsList);
