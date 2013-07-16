/** @jsx React.DOM */
OrganizationList = React.createClass({
  propTypes: {
    organizations: React.PropTypes.array
  },

  getDefaultProps: function(){ 
    return { organizations: [] }; 
  },

  render: function(){
    var self = this;

    function listItem(org){
      return (
        <li>
          <a href='#' onClick={self.changeOrg.bind(this, org)}>
            {org.get('name')}
          </a>
        </li>
      );
    }

    return this.transferPropsTo(
      <ul>
        {this.props.organizations.map(listItem)}
      </ul>
    );
  },

  changeOrg: function(org){
    this.props.onOrgChange(org);
    return false;
  }
});

