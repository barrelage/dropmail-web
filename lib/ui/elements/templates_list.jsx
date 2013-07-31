/** @jsx React.DOM */
TemplateList = React.createClass({
  propTypes: {
    templates: React.PropTypes.array
  },

  getDefaultProps: function(){
    return { templates: [] };
  },

  render: function(){
    var self = this;

    function listItem(template){
      return (
        <li>
          <a href='#' onClick={self.showTemplate.bind(this, template)}>
            {template.get('name')}
          </a>
        </li>
      );
    }

    return this.transferPropsTo(
      <ul>
        {this.props.templates.map(listItem)}
      </ul>
    );
  },

  showTemplate: function(template){
    app.router.navigate('/templates/'+template.get('slug'), { trigger: true });
    return false;
  }
});

