Template.userEditPermission.onCreated(function() {
  console.log(this);
  Session.set("chkName",this.data.permission.name);
  Session.set("chkTel",this.data.permission.tel);
  Session.set("chkAddr",this.data.permission.addr);
  Session.set("chkEmail",this.data.permission.email);

});


Template.userEditPermission.helpers({

  isChkAll:function(){
     return Session.equals("chkName",true) && Session.equals("chkTel",true)&& Session.equals("chkAddr",true)
     && Session.equals("chkEmail",true)?'checked':'';
  },
  isCheckName:function(){

    return Session.equals("chkName",true)?'checked':'';

  },
  isCheckTel:function(){

    return Session.equals("chkTel",true)?'checked':'';

  },
  isCheckAddr:function(){

    return Session.equals("chkAddr",true)?'checked':'';

  },
  isCheckEimail:function(){

    return Session.equals("chkEmail",true)?'checked':'';

  }

});


Template.userEditPermission.events({


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
      toastr.success('user has update permission');


      Router.go('tagsList');
      //Router.go('petVaccine',{no:result.no});
  });

 }



});
