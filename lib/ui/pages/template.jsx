/** @jsx React.DOM */
Pages.Template = React.createClass({

  getInitialState: function(){
    this.reloadTemplate();

    return { template: null };
  },

  render: function(){
    return (
      <div>foo</div>
    );
  },

  reloadTemplate: function(){
    var self = this;

    app.client.Template.find(this.props.id, function(err, template){
      self.setState({ template: template});
    });
  }
});
