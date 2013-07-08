/** @jsx React.DOM */
Pages.Index = React.createClass({
  render: function(){
    if (!this.props.user) return Pages.MarketingSplash(this.props);

    return (
      <div class='row'>
        <div class='span12'>
          Were logged in!
        </div>
      </div>
    );
  }
});
