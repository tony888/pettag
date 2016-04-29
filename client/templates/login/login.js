Template.login.onCreated(function() {
  Session.set('userSubmitErrors', {});

});


Template.login.helpers({
  errorMessage: function(field) {
    return Session.get('userSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('userSubmitErrors')[field] ? 'has-error' : '';
  }


});


Template.login.events({
  "submit form": function(event, template){
      event.preventDefault();
      //Session.set('userSubmitErrors', {});

      var user = {
        email:$.trim($('[name=email]').val()),
        password:$.trim($('[name=password]').val())
    };
  //  console.log(user);
    var errors = validateLogin(user);
    console.log(errors);

    if(errors.email || errors.password)
      return Session.set('userSubmitErrors',errors);

      Meteor.loginWithPassword(user.email, user.password,function(error){

        if(Meteor.user()){
          toastr.success('Login success');
          Router.go('tagsList');
        }else{
            toastr.error.reason;
        }

      });


  }



});
