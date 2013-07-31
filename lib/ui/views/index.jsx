/** @jsx React.DOM */
Views.Index = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  render: function(){
    if (!this.props.session) return Views.MarketingSplash(this.props);

    return Views.Organizations(this.props);
  }

});
