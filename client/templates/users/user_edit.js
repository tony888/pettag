Template.userEdit.onCreated(function() {
  //console.log(this.data);

  Session.set('userEditErrors', {});
});


Template.userEdit.helpers({
  errorMessage: function(field) {
    return Session.get('userEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('userEditErrors')[field] ? 'has-error' : '';
  },




});

Template.userEdit.events({
     //'click #': function(e) {

     "change #sel_all":function(event,template){
       event.preventDefault();

      var selectAll = template.$("#sel_all").is(":checked");
      // console.log(selectAll);

       if(selectAll===true){
         $("input[name=tagPermis]").prop("checked",true);
       }else{
         $("input[name=tagPermis]").prop("checked",false);
       }
     },

     'submit form':function(event,template) {
       event.preventDefault();

        var addr =  $.trim(template.$("#addr").val());
        var name =  $.trim(template.$("#name").val());
        var tel =  $.trim(template.$("#tel").val());
        var email =  $.trim(template.$("#email").val()).toLowerCase();

        var errors = validateProfile(email,name,tel);

        if( errors.name || errors.email ||  errors.tel)
            return Session.set('userEditErrors',errors);




        Meteor.call("editUsers",email,name,addr,tel, function(error, result){
          if (error)
            toastr.error.reason;

          if (result)
            toastr.success('This user profile has updated');

          Router.go('tagsList');


        });



     }
});
