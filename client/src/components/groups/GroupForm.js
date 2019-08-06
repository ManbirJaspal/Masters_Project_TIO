import React from 'react';
import { Field, reduxForm } from 'redux-form';

class GroupForm extends React.Component {
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
        <Field name="group_name" component={this.renderInput} label="Enter Title"></Field>

        <Field name="group_description" component={this.renderInput} label="Enter Description"></Field>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};
  if(!formValues.group_name) {
    errors.group_name = 'You must enter a title';
  }

  if (!formValues.group_description) {
    errors.group_description = 'You must enter a description';
  }

  return errors;

};

export default reduxForm({
  form: 'groupForm',
  validate: validate
})(GroupForm);
