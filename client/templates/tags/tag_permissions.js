
Template.tagPermission.rendered  = function () {
  //console.log(this);
}



Template.tagPermission.helpers({
  //'submit form': function(e) {


});


Template.tagPermission.events({


 "change #sel_all":function(event,template){
   event.preventDefault();

  var selectAll = template.$("#sel_all").is(":checked");
   //console.log(selectAll);

   if(selectAll===true){
     $("input[name=tagPermis]").prop("checked",true);
   }else{
     $("input[name=tagPermis]").prop("checked",false);
   }
 },
'click #btn-skip' :function(event,template){
  var tagNo = $.trim(template.$("#tagNo").val());
  Router.go('petVaccineList',{no:tagNo});
},
 'submit form':function(event, template){
   event.preventDefault();
   /*
   var selected = template.findAll("input[name=tagPermis]:checked");
   var tag = _.map(selected,function(item){
     return item.defaultValue;
   });
   */

   var tagNo = $.trim(template.$("#tagNo").val());
  // $.trim($(event.target).find('[name=tagNo]').val());


   var tag = {

     chk_tagNo:template.$("#chk_tagNo").is(":checked"),
     typeId:template.$("#chk_typeId").is(":checked"),
     age:template.$("#chk_age").is(":checked"),
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
     remark:template.$("#chk_remark").is(":checked")

   };
   //console.log(tag);

  Meteor.call('tagSetPermission',tag ,tagNo, function(error, result) {

    if (error)
      toastr.error.reason;

    if (result)
      toastr.success('This tag has set permission');


      Router.go('petVaccineList',{no:result.no});
      //Router.go('petVaccine',{no:result.no});
  });

 }



});
