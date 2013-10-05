/** @jsx React.DOM */
DomainTable = React.createClass({

  render: function() {
    var self = this
      , domains = this.props.domains;

    function listItem(domain){
      return (
        <tr onClick={self.showDomain.bind(this, domain)}>
          <td>{domain.get('host')}</td>
          <td>{domain.get('status')}</td>
          <td>{domain.get('created_at')}</td>
        </tr>
      );
    }

    if (!domains) {
      return (
        <div class='alert alert-info'>
          Loading..
        </div>
      );
    } else if (!domains[0]) {
      return (
        <div class='alert'>
          Looks like we need to create a domain.
        </div>
      );
    }

    return (
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>Host</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {this.props.domains.map(listItem)}
        </tbody>
      </table>
    );
  },

  showDomain: function(template) {
    app.goTo('domains/' + template.get('id'));
    return false;
  },

});
