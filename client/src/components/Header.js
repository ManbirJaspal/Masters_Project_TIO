import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleLogout = () => {
    this.props.signOut();
  }

  chatOnClickHandler = () => {
    // console.log("inside chatOnClickHandler()");
    // this.setState({chatOn: true});
  }
  render() {
  return (
    <div className="ui container">

      <div className="ui inverted menu">
        <div className="header item">
          TIO
        </div>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent inverted icon input">
              <i className="search icon"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <Link className="item" to="/chatwith"> Chat
          </Link>
          <Link onClick={this.handleLogout} to='/login' className="item ">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};
}

export default connect(null, { signOut })(Header);
