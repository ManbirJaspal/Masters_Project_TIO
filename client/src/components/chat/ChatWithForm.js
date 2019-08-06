import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ChatWithForm extends React.Component {
renderError({error, touched}){
  if (touched && error) {
    return (
      <div className = "ui error message">
        <div className="header">{error}</div>
      </div>
    )
  }
}

  renderInput = ({ input, label, meta }) =>  {
    const className= `field ${meta.error && meta.touched ? 'error': ''}`;
    console.log(input);

    return  (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSub = (formValues) => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSub)} className="ui form error">
        <Field name="chat_id" component={this.renderInput} label="Enter ID"></Field>

        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};
  if(!formValues.chat_id) {
    errors.chat_id = 'You must enter an ID';
  }



  return errors;

};

export default reduxForm({
  form: 'chatForm',
  validate: validate
})(ChatWithForm);
