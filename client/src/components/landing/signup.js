import React, { Component } from "react";
import history from '../../history';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import qs from "qs";
import axios from 'axios';
import { url } from "../utils/RestUtils";


export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      fname: "",
      lname: "",
      password: "",
      a_id: "",
    };
  }

  handleSubmit() {



    const reg_Data = qs.stringify({
      email: this.state.emailId,
      password:this.state.password,
      fname: this.state.fname,
      lname: this.state.lname,
      a_id: this.state.a_id
    });

        axios.post(url + "student", reg_Data)
         .then(response => {
          console.log('SUCCESSFULLy REGISTERED AT CLIENT')
          console.log(response.data);
          history.push("/login");
          })
          console.log(this.state);
  }

   validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
        //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
        if(email.indexOf("@student.gsu.edu", email.length - "@student.gsu.edu".length) !== -1){
            console.log("Email is valid");
        }
        // else {
        //   history.push("/signup");
           // alert("Please enter email ending in @student.gsu.edu");
        // }
    }
}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         Sign-Up
      </Header>
      <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='First name' name="fname" id="fname" onChange={this.handleChange.bind(this)}/>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Last name' name="lname" id="lname" onChange={this.handleChange.bind(this)} />
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="emailId" id="email" type='email' onChange={this.handleChange.bind(this)} />
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Anonymous ID' name="a_id" id="a_id" onChange={this.handleChange.bind(this)}/>

          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name="password" id="password"
            onChange={this.handleChange.bind(this)}
          />

          <Button color='teal' fluid size='large' type="submit">
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        Back to Login? <Link to='/login'>Login</Link>
      </Message>
    </Grid.Column>
    </Grid>
    );
  }
}
