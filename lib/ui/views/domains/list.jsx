/** @jsx React.DOM */
if (Views.Domains == undefined) Views.Domains = {};

Views.Domains.List = React.createClass({

  getInitialState: function() {
    this.fetchDomains();
    return { domains: null };
  },

  render: function() {
    return (
      <div>
        <h2>Domains</h2>
        <DomainTable domains={this.state.domains} />

        <h3>New Domain</h3>
        <DomainForm />
      </div>
    );
  },

  // private

  fetchDomains: function() {
    var self = this;

    app.client.Domain.fetch(function(err, domains){
      if (err) return console.error(err);
      self.setState({ domains: domains });
    });
  },
});

