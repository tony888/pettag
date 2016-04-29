Template.userRegister.onCreated(function() {
  Session.set('userSubmitErrors', {});

});


Template.userRegister.helpers({
  errorMessage: function(field) {
    return Session.get('userSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('userSubmitErrors')[field] ? 'has-error' : '';
  }
});


Template.userRegister.events({
  'click #regis':function(event,template){
    event.preventDefault();
    //Session.set('userSubmitErrors', null);
  //'submit form':function(events,template){

    var user = {
      emails:$.trim($('[name=emails]').val()),
      password1:$.trim($('[name=password1]').val()),
      password2:$.trim($('[name=password2]').val()),
      name:$.trim($('[name=name]').val()),
      tel:$.trim($('[name=tel]').val()),
      address:$.trim($('[name=address]').val())

    };
    //console.log(user);


    var errors = validateRegister(user);
    //console.log(errors);

    if( errors.emails || errors.password1 ||  errors.password2 ||
      errors.name|| errors.tel || errors.address )

      return Session.set('userSubmitErrors',errors);

      Meteor.call("createUsers",user.emails,user.password1,user.name,user.address,user.tel, function(error, result){
        if(error){
          toastr.error.reason;
        }
        if(result){

            Meteor.loginWithPassword(user.emails, user.password1,function(error){
              toastr.error.reason;
            });

          if(Meteor.loggingIn()){
            toastr.success('สร้างบัญชีผู้ใช้สำเร็จ');
            Router.go('userPermission');
          }

          //console.log(Meteor.loggingIn())
          //  toastr.success('สร้างบัญชีผู้ใช้สำเร็จ');
        }
      });

  }
});
