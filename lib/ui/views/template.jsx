/** @jsx React.DOM */
Views.Template = React.createClass({

  getInitialState: function(){
    this.reloadTemplate();

    return { template: null };
  },

  render: function(){
    return (
      <div class='row'>
        <NavigationColumn current='organizations' />

        <div class='span10'>
          Hi
        </div>
      </div>
    );
  },

  reloadTemplate: function(){
    var self = this;

    app.client.Template.find(this.props.id, function(err, template){
      self.setState({ template: template});
    });
  }
});
