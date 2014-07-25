var Dispatcher = require('./Dispatcher')
  , merge = require('react/lib/merge');

var AppDispatcher = merge(Dispatcher.prototype, {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action, data) {
    this.dispatch({ action: action, data: data });
  }

});

module.exports = AppDispatcher;
