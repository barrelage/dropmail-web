var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  }
, index: function() {
    $form = $('.signup-form');

    if (app.credentials) {
      app.User.me(function(err, user){
        if (err) return signedOut();
        signedUp(user);
      });
    } else {
      signedOut();
    }

    function signedOut() {
      $form.each(function(i, el) {
        var signupForm = new Dropmail.ui.SignupForm({ onSignup: signedUp });
        React.renderComponent(signupForm, el);
      });
    }

    function signedUp(user){
      $form.replaceWith(
        '<div>Hi ' + user.get('name') + ', thanks for signing up!<' + '/div>'
      );

      if (user.get('password')) {
        getAuthorization(user);
      }
    }

    function getAuthorization(user) {
      app.authenticate(user);
      app.Authorization.save(function(err, auth){
        if (err) { return; /* TODO: handle errors */ }

        app.authenticate(auth);
        $.cookie('key', auth.get('key'));
      });
    }
  }
});
