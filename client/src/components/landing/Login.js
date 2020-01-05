import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import qs from 'qs';
import { url } from "../utils/RestUtils";
import { signIn } from '../../actions';
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      error: "",
      u_id: null,
      mod: null,
    };
  }

  componentDidMount(props) {
    var paramid = 'mod';
    if (this.props.match.params.id === paramid) {
      this.setState({mod: true});
    }
  }

  componentWillUnmount() {
    this.setState({mod: null});
  }

  handleSubmit(event){
    const login_Data = qs.stringify({
      email: this.state.emailId,
      password: this.state.password,
      mod: this.state.mod,
    });

    if(this.state.mod) {
      axios.post(url + "login", login_Data)
      .then(response => {
        console.log("response generated inside Login.js ",response.data[0]["mod_id"]);
        this.setState({ u_id: response.data[0]["mod_id"]});
        console.log(this.state);
        this.callSignInAction();
      },
      function(error) {
        console.log(error)
      }
    );
  } else {
    axios.post(url + "login", login_Data)
    .then(response => {
      console.log("response generated inside Login.js ",response.data[0]["student_id"]);
      this.setState({ u_id: response.data[0]["student_id"]});
      console.log(this.state);
      this.callSignInAction();
    },
    function(error) {
      console.log(error)
    }
  );
}
}

callSignInAction = () => {
  console.log("inside callSignInAction()");
  this.props.signIn(this.state.u_id, this.state.mod);
}

handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  });
  console.log(this.state);
};

render(){
  return(
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="emailId" id="email" onChange={this.handleChange.bind(this)}/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password" id="password"
                onChange={this.handleChange.bind(this)}
                />
              <Button color='teal' fluid size='large' type='submit'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
    {this.state.login === true ? <div>Logged in</div>: null}
  </div>
)
}
}

export default connect(null, { signIn })(Login);
