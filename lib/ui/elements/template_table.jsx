/** @jsx React.DOM **/
TemplateTable = React.createClass({

  render: function() {
    var self = this
      , templates = this.props.templates;

    function listItem(template){
      return (
        <tr onClick={self.showTemplate.bind(this, template)}>
          <td>{template.get('name')}</td>
          <td>{template.get('slug')}</td>
          <td>{template.get('created_at')}</td>
        </tr>
      );
    }

    if (!templates) {
      return (
        <div class='alert alert-info'>
          Loading.. 
        </div>
      );
    }

    if (!templates[0]) {
      return (
        <div class='alert'>
          Looks like we need to create a template.
        </div>
      );
    }

    return (
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {this.props.templates.map(listItem)}
        </tbody>
      </table>
    );
  },

  showTemplate: function(template) {
    app.goTo('templates/' + template.get('slug'));
    return false;
  },

});
