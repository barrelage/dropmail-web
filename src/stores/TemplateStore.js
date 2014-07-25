var AppDispatcher = require('../dispatcher/AppDispatcher')
  , EventEmitter = require('events').EventEmitter
  , AppConstants = require('../constants/AppConstants')
  , merge = require('react/lib/merge')
  , CHANGE_EVENT = 'template_change'
  , _error = {}
  , _templates = [];


function list() {
  Dropmail.Template.fetch(function(err, templates){
    _templates = templates;
    TemplateStore.emit('change');
  });
}

function create(data) {
  Dropmail.Template.save(data, function(err, template) {
    TemplateStore.emit('change');

    if (err) {
      TemplateStore.emit('error', template);
      return false;
    }

    _templates.push(template);
    TemplateStore.emit('create', template);
  });
}

var TemplateStore = merge(EventEmitter.prototype, {
  get: function() {
    return _templates;
  },

  dispatchIndex: AppDispatcher.register(function(payload) {
    var action = payload.action
      , data = payload.data;

    switch(action) {
      case AppConstants.TEMPLATE_LIST:
        list();
        break;

      case AppConstants.TEMPLATE_LOAD:
        load(data.id);
        break;

      case AppConstants.TEMPLATE_CREATE:
        create(data);
        break;

      default:
        return true;
    }

    TemplateStore.emit('change');

    return true;
  })
});

module.exports = TemplateStore;
