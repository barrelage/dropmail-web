/** @jsx React.DOM */
Pages.Index = React.createClass({

  getInitialState: function(){
    return { errors: {} };
  },

  render: function(){
    if (!this.props.session) return Pages.MarketingSplash(this.props);

    return Pages.Organizations(this.props);
  }

});
