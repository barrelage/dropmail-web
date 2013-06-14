function respond(form, callback){
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
        input.after("<div class='help-block'>" + errors[name] + '<' + '/div>');
      }

      $button.attr('disabled', false).text(buttonText);
      return;
    }

    if (callback) callback(err, object);
  };
}
