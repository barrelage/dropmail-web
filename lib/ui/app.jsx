/** @jsx React.DOM */
Views = {};

App = React.createClass({
  getDefaultProps: function(){
    return { page: 'index' };
  },

  render: function(){
    var auth = app.authorization;

    return (
      <div class='row'>
        <div class='col-sm-3 col-md-2'>
          <ul class='nav nav-stacked'>
            <li class='logo' onClick={app.goTo}>
              <a href='#'>Dropmail</a>
            </li>
            <li class='dropdown active'>
              <a class='dropdown-toggle' data-toggle='dropdown' href='#'>
                <span class='glyphicon glyphicon-user' />
                { auth.get('user').get('name') }
              </a>
              <ul class='dropdown-menu'>
                <li onClick={this.signOut}>
                  <a href='#'>Logout</a>
                </li>
                <li onClick={app.goTo.bind(this, 'account')}>
                  <a href='#'>Settings</a>
                </li>
              </ul>
            </li>
            <li class='dropdown'>
              <a class='dropdown-toggle' data-toggle='dropdown' href='#'>
                <span class='glyphicon glyphicon-heart' />
                { auth.get('organization').get('name') }
              </a>
              <OrganizationList class='dropdown-menu' />
            </li>
            <li onClick={app.goTo.bind(this, 'templates')}>
              <a href='#'>
                <span class='glyphicon glyphicon-text-height' />
                Templates
              </a>
            </li>
            <li onClick={app.goTo.bind(this, 'emails')}>
              <a href='#'>
                <span class='glyphicon glyphicon-envelope' />
                Emails
              </a>
            </li>
            <li onClick={app.goTo.bind(this, 'members')}>
              <a href='#'>
                <span class='glyphicon glyphicon-flag' />
                Members
              </a>
            </li>
            <li onClick={app.goTo.bind(this, 'domains')}>
              <a href='#'>
                <span class='glyphicon glyphicon-globe' />
                Domains
              </a>
            </li>
          </ul>
        </div>

        <div class='col-sm-9 col-md-10'>
          {this.renderPage()}
        </div>
      </div>
    );
  },

  // private

  renderPage: function() {
    var pages = this.props.page.split('/');
    pages.unshift('views');

    return _.reduce(pages, function(scope, name){
      name = name.charAt(0).toUpperCase() + name.slice(1);

      return scope[name];
    }, window)(this.props.viewProps);
  },

  signOut: function() {
    app.client.endSession();
    window.location.reload();
    return false;
  }

});

