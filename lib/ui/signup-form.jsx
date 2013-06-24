/** @jsx React.DOM */
Dropmail.ui.SignupForm = React.createClass({
  getInitialState: function() {
    return { errors: {} };
  }
, componentDidMount: function(el) {
    app.User.form($(el), this.onResponse.bind(this));
  }
, onResponse: function(err, user) {
    if (err) {
      if (!err.attributes) return alert(err.message); // TODO: Global alerting.
      return this.setState({ errors: err.attributes });
    } else { this.setState({ errors: {} }); }

    if (this.props.onSignup) { this.props.onSignup(user); }
  }
, render: function() {
    var Form = Dropmail.ui.Form
      , FormField = Dropmail.ui.FormField
      , errors = this.state.errors;

    return <Form name='signup' submitLabel='Sign Up' >
      <FormField
        label='Name'
        name='name'
        placeholder='First Last'
        errors={ errors.name } />
      <FormField
        label='Email'
        name='email'
        placeholder='user@example.com'
        errors={ errors.email } />
      <FormField
        label='Password'
        name='password'
        placeholder='••••••••'
        type='password'
        errors={ errors.password } />
    </Form>;
  }
});
