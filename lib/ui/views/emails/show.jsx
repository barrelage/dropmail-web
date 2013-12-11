/** @jsx React.DOM */
if (Views.Emails == undefined) Views.Emails = {};

Views.Emails.Show = React.createClass({

  getInitialState: function() {
    this.fetchEmail();
    return { email: new app.client.Email };
  },

  render: function() {
    var email = this.state.email;

    return (
      <div>
        <h2>Show Email</h2>

        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-2 control-label">
              From
            </label>

            <div class="col-lg-10">
              {email.get('from')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              To
            </label>

            <div class="col-lg-10">
              {email.get('to')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Subject
            </label>

            <div class="col-lg-10">
              {email.get('subject')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Params
            </label>

            <div class="col-lg-10">
              {email.get('params')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Content
            </label>

            <div class="col-lg-10">
              {email.get('html')}
            </div>
          </div>
        </form>
      </div>
    );
  },

  // private

  fetchEmail: function() {
    var self = this;

    console.log(this.props);
    app.client.Email.find(this.props.id, function(err, email){
      if (err) return console.error(err);
      self.setState({ email: email });
    });
  },

});

