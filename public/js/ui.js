
function onSubmit($form, model, callback){
  $form.on('submit', function(){
    model.create(serializeObject($form), respond($form, callback));
    return false;
  });
}

function serializeObject($form){
  var params = {};

  $.each($form.serializeArray(), function(){
    params[this.name] = this.value;
  });

  return params;
}

function respond($form, callback){
  var $button = $(this).children('button')
    , buttonText = $button.text();

  return function(err, object){
    $form.find('.control-group').removeClass('error');
    $form.find('.help-block').remove();

    if (err) {
      var errors = err.attributes;

      for (var name in errors) {
        var input = $('input[name=' + name + ']');
        input.closest('.control-group').addClass('error');
        input.after("<div class='help-block'>" + toSentence(errors[name]) + '</div>');
      }

      $button.attr('disabled', false).text(buttonText);
      return;
    }

    if (callback) callback(err, object);
  };
}

function toSentence(array){
  return array.join(', ');
}
