window.ui = {};

ui.handleValidation = function(err, $form){
  var $button = $(this).children('button')
    , buttonText = $button.text();

  $form.find('.control-group').removeClass('error');
  $form.find('.help-block').remove();

  var errors = err.attributes;

  for (var name in errors) {
    var input = $('input[name=' + name + ']');
    input.closest('.control-group').addClass('error');
    input.after("<div class='help-block'>" + toSentence(errors[name]) + '</div>');
  }

  $button.attr('disabled', false).text(buttonText);

  function toSentence(array){
    return array.join(', ');
  }
};
