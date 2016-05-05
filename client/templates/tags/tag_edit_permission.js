
Template.tagEditPermission.onCreated(function() {

  Session.set("chkTagNo",this.data.permission.chk_tagNo);
  Session.set("chkAppear",this.data.permission.appearance);
  Session.set("chkBreed",this.data.permission.breed);
  Session.set("chkGender",this.data.permission.gender);
  Session.set("chkColor",this.data.permission.color);
  Session.set("chkDesc",this.data.permission.desc);
  Session.set("chkDob",this.data.permission.dob);
  Session.set("chkHeight",this.data.permission.height);
  Session.set("chkName",this.data.permission.name);
  Session.set("chkRemark",this.data.permission.remark);
  Session.set("chkTypeId",this.data.permission.typeId);
  Session.set("chkWeight",this.data.permission.weight);
  Session.set("chkRemark",this.data.permission.remark);
  Session.set("chkAge",this.data.permission.age);

  Session.set("chkMicroShip",this.data.permission.microship);

});

Template.tagEditPermission.helpers({
  //'submit form': function(e) {
  isChkAll:function(){
     return Session.equals("chkTagNo",true) && Session.equals("chkAppear",true)&& Session.equals("chkAge",true)
     && Session.equals("chkBreed",true) && Session.equals("chkGender",true)
     && Session.equals("chkColor",true) && Session.equals("chkDesc",true)
     && Session.equals("chkDob",true) && Session.equals("chkHeight",true)
     && Session.equals("chkName",true) && Session.equals("chkRemark",true)
     && Session.equals("chkTypeId",true) && Session.equals("chkWeight",true)
     && Session.equals("chkRemark",true) && Session.equals("chkMicroShip",true)?'checked':'';
  },

  isCheckTag:function(){

    return Session.equals("chkTagNo",true)?'checked':'';

  },
  isCheckAge:function(){

    return Session.equals("chkAge",true)?'checked':'';

  },
  isCheckAppear:function(){

    return Session.equals("chkAppear",true)?'checked':'';

  },
  isCheckBreed:function(){

    return Session.equals("chkBreed",true)?'checked':'';

  },
  isCheckGender:function(){

    return Session.equals("chkGender",true)?'checked':'';

  },

  isCheckColor:function(){

    return Session.equals("chkColor",true)?'checked':'';

  },
  isCheckDesc:function(){

    return Session.equals("chkDesc",true)?'checked':'';

  },
  isCheckDob:function(){

    return Session.equals("chkDob",true)?'checked':'';

  },
  isCheckName:function(){

    return Session.equals("chkName",true)?'checked':'';

  },
  isCheckRemark:function(){

    return Session.equals("chkRemark",true)?'checked':'';

  },
  isCheckTypeId:function(){

    return Session.equals("chkTypeId",true)?'checked':'';

  },
  isCheckWeight:function(){

    return Session.equals("chkWeight",true)?'checked':'';

  },
  isCheckMicroship:function(){

    return Session.equals("chkMicroShip",true)?'checked':'';

  },
  isCheckHeight:function(){

    return Session.equals("chkHeight",true)?'checked':'';

  }






});


Template.tagEditPermission.events({


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

 'submit form':function(event, template){
   event.preventDefault();
   /*
   var selected = template.findAll("input[name=tagPermis]:checked");
   var tag = _.map(selected,function(item){
     return item.defaultValue;
   });
   */

   var tagNo = $.trim($(event.target).find('[name=tagNo]').val());
   var tag = {

     chk_tagNo:template.$("#chk_tagNo").is(":checked"),
     typeId:template.$("#chk_typeId").is(":checked"),
     name:template.$("#chk_name").is(":checked"),
     microship:template.$("#chk_microship").is(":checked"),
     dob:template.$("#chk_dob").is(":checked"),
     gender:template.$("#chk_gender").is(":checked"),
     breed:template.$("#chk_breed").is(":checked"),
     color:template.$("#chk_color").is(":checked"),
     weight:template.$("#chk_weight").is(":checked"),
     height:template.$("#chk_height").is(":checked"),
     appearance:template.$("#chk_appearance").is(":checked"),
     desc:template.$("#chk_desc").is(":checked"),
     remark:template.$("#chk_remark").is(":checked"),
     age:template.$("#chk_age").is(":checked"),


   };
   //console.log(tag);

  Meteor.call('tagSetPermission',tag ,tagNo, function(error, result) {

    if (error)
      toastr.error.reason;

    if (result)
      toastr.success('This tag has update permission');

    Router.go('tagsList');
  });

 }



});
