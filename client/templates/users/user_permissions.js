Template.userPermission.onCreated(function() {
  //console.log(Meteor.userId());

});



Template.userPermission.events({


 "change #sel_all":function(event,template){
   event.preventDefault();

  var selectAll = template.$("#sel_all").is(":checked");
   //console.log(selectAll);

   if(selectAll===true){
     $("input[name=userPermis]").prop("checked",true);
   }else{
     $("input[name=userPermis]").prop("checked",false);
   }
 },

 'submit form':function(event, template){
   event.preventDefault();

   var user = {

     name:template.$("#chk_name").is(":checked"),
     tel:template.$("#chk_tel").is(":checked"),
     addr:template.$("#chk_addr").is(":checked"),
     email:template.$("#chk_email").is(":checked")


   };
   //console.log(tag);

  Meteor.call('userPermission',user, function(error, result) {

    if (error)
      toastr.error.reason;

    if (result)
      toastr.success('user has set permission');


      Router.go('tagsList');
      //Router.go('petVaccine',{no:result.no});
  });

 }



});
