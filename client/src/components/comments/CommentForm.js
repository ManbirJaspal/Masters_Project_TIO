import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
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

    return  (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="comment" component={this.renderInput} label="Enter Comment"></Field>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};


  if (!formValues.comment) {
    errors.comment = 'You must enter a Comment';
  }

  return errors;

};

export default reduxForm({
  form: 'commentForm',
  validate: validate
})(CommentForm);
