/** @jsx React.DOM */
NavigationColumn = React.createClass({
  render: function(){
    var self = this;

    var items = [
      { path: '/organizations', name: 'Organizations' },
      { path: '/templates',     name: 'Templates' }
    ];

    function listItem(item){
      return (
        <li>
          <a href='#' onClick={self.navigate.bind(this, item.path)}>
            {item.name}
          </a>
        </li>
      );
    }

    return (
      <div class='span2'>
        <ul class='nav nav-list'>
          {items.map(listItem)}
        </ul>
      </div>
    );
  },

  navigate: function(path){
    app.router.navigate(path, { trigger: true });
    return false;
  }
});
