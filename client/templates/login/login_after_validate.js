Template.loginAfterVelidate.onCreated(function() {
  Session.set('userSubmitErrors', {});
  Session.set('tagno', this.data.no);
  //console.log(this);
});


Template.loginAfterVelidate.helpers({
  errorMessage: function(field) {
    return Session.get('userSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('userSubmitErrors')[field] ? 'has-error' : '';
  }


});


Template.loginAfterVelidate.events({
  "submit form": function(event, template){
      event.preventDefault();
      //Session.set('userSubmitErrors', {});

      var user = {
        email:$.trim($('[name=email]').val()),
        password:$.trim($('[name=password]').val())
    };
  //  console.log(user);
    var errors = validateLogin(user);
    //console.log(errors);

    if(errors.email || errors.password)
      return Session.set('userSubmitErrors',errors);

      Meteor.loginWithPassword(user.email, user.password,function(error){
          /*
          console.log(Meteor.user());
          console.log(Meteor.userId());
          */
        if(Meteor.userId()){
          if(Session.get('tagno')){
            //console.log(Session.get('tagno'));
            toastr.success('Login success');
            Router.go('petSubmit',{no:Session.get('tagno')});
          }else{
            Router.go('tagsList');
          }


        }else{
            toastr.error.reason;
        }

      });


  }



});
