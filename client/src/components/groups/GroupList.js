import React from "react";
import { connect } from "react-redux";
import { getGroups } from '../../actions';
import {Link} from 'react-router-dom';

class GroupList extends React.Component {

  componentDidMount() {
    this.props.getGroups();
  }


  renderList() {
   return this.props.groups.map(group => {
     return (

       <div className="item" key={group.group_id}>
         {this.renderAdmin(group)}
         <i className="large middle aligned icon camera" />
         <div className="content">
           <div>
             <Link to={`/posts/${group.group_id}`} className="header">
               {group.group_name}
             </Link>
             <div class="meta">
               <span>Description</span>
      </div>
      <div className=" description">
        <p>{group.group_description}</p>
      </div>
      <div class="extra content">
        <span>created by: {group.group_user_id}</span>

      </div>
           </div>
         </div>
       </div>
         );
         });
 }

 renderAdmin = (group) => {
   console.log("Inside renderADMIN () IN GROUPLIST");

   if (group.group_user_id == this.props.currentUserId) {
     console.log(group.group_id)
     return (
       <div  className="right floated content">
         <Link to={`/groups/edit/${group.group_id}`} className="ui button primary">
           Edit
         </Link>
         <Link
           to={`/groups/delete/${group.group_id}`}
           className="ui button negative"
         >
           Delete
         </Link>
       </div>
     );
   }
 }

 renderCreate() {
 if (this.props.isSignedIn && this.props.mod == null) {
   return (
     <div style={{ textAlign: 'right' }}>
       <Link
         to={`/groups/new`}
         className="ui grey basic button">Create a group
       </Link>
     </div>
   );
 }
}

  render() {
  return (
 <div>
   <div className="ui container">

       <div className="ui celled list">{this.renderList()}</div>
       {this.renderCreate()}

   </div>
 </div>
          );
       }

}

const mapStateToProps = state => {
  return {
    groups: Object.values(state.groups),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    mod: state.auth.mod
  };
};

export default connect(mapStateToProps, { getGroups })(GroupList);
