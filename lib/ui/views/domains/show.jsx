/** @jsx React.DOM */
if (Views.Domains == undefined) Views.Domains = {};

Views.Domains.Show = React.createClass({

  getInitialState: function() {
    this.fetchDomain();
    return { domain: new app.client.Domain };
  },

  render: function() {

    var self = this;
    function verifyForm() {
      if (self.state.domain.get('status') == 'verified') return;

      return (
        <form method='post' class='form-horizontal' ref='form' onSubmit={self.handleVerify}>
          <FormSubmit label='Verify Now' />
        </form>
      );
    }

    return (
      <div>

        <h2>Show Domain</h2>

        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-2 control-label">
              Host
            </label>

            <div class="col-lg-10">
              {this.state.domain.get('host')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Status
            </label>

            <div class="col-lg-10">
              {this.state.domain.get('status')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Verification Token
            </label>

            <div class="col-lg-10">
              {this.state.domain.get('verification_token')}
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-2 control-label">
              Created at
            </label>

            <div class="col-lg-10">
              {this.state.domain.get('created_at')}
            </div>
          </div>
        </form>

        {verifyForm()}
      </div>
    );
  },

  // private

  handleVerify: function() {
    var self = this;

    this.state.domain.verify(function(err, domain){
      if (err) return self.setState({ errors: err.attributes });
      self.fetchDomain();
    });

    return false;
  },

  fetchDomain: function() {
    var self = this;

    app.client.Domain.find(this.props.id, function(err, domain) {
      if (err) return console.error(err);
      self.setState({ domain: domain });
    });
  }
});

