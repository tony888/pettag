/*
Tracker.autorun(function() {
    console.log("The selectedType  is: " +
                 Session.get("selectedType"));

    console.log("The selectedGender  is: " +
                              Session.get("selectedGender"));
});
*/
Template.tagEdit.onCreated(function() {
 //console.log(this)

  Session.set('tagEditErrors', {});

  Session.set("selectedType",this.data.pet.typeId);
  Session.set("selectedGender",this.data.pet.gender);


});

Template.tagEdit.rendered=function() {
	  $('#dob').datepicker({
      format:"dd-mm-yyyy"
    });
}




Template.tagEdit.helpers({
  ownsFile:function(){
      return this.userId === Meteor.userId();
  },
  errorMessage: function(field) {
    return Session.get('tagEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tagEditErrors')[field] ? 'has-error' : '';
  },
  getSelect:function(filed){
    return  Masters.find({"name":"master"},{filed:1});
  },
  isSelectedType:function(){

    return Session.equals("selectedType",this.name)?'selected':'';

  },

  isSelectedGender:function(){
  //console.log(this);

    return Session.equals("selectedGender",this.value)?'selected':'';

  },

  profiles:function(){
    console.log(this);
    var pid = this.profile.file_id;
   //userId:Meteor.userId(),tagNo:this.no,"typeName":"profile"
    var r=  FilesStore.find({_id:pid},{sort:{uploadedAt:-1}});
    console.log(r);
    return r;
  },
  profileImage:function(){

    return this.profile;
  },

  galleryImage:function(){
    return this.gallery;
  },
  files:function(){
    return this.files;
  }


});


Template.tagEdit.events({
  "change #typeId": function(event){

      Session.set("selectedType", event.currentTarget.value);
  },
  "change #gender": function(event){
      Session.set("selectedGender", event.currentTarget.value);
  },
  "click .delete-image": function(event){
     event.preventDefault();
     var tag_no = $("input[name=tagNo]").val();
     var fileId = this._id;
     //console.log(fileId);
     var sure = confirm("ต้องการลบ file นี้ ? ");


     if(sure===true){
       FilesStore.remove({_id:this._id},function(error,result){

         if(error){
           toastr.error("เกิดข้อผิดพลาด !! "+error);
         }else{

           Meteor.call("tagRemoveProfileImage", tag_no,fileId, function(error, result){
             if(error){
               toastr.error("เกิดข้อผิดพลาด !! "+error);
             }
             if(result){

               toastr.success("ลบ file สำเร็จ");
             }
           });

         }
       });


     }

  },

  'submit form': function(e) {
    e.preventDefault();
    var tagNo = $.trim($(e.target).find('[name=tagNo]').val());

    var tag = {
      name:$.trim($(e.target).find('[name=name]').val()),
      microship:$.trim($(e.target).find('[name=microship]').val()),
      dob:$.trim($(e.target).find('[name=dob]').val()),
      height:$.trim($(e.target).find('[name=height]').val()),
      weight:$.trim($(e.target).find('[name=weight]').val()),
      appearance:$.trim($(e.target).find('[name=appearance]').val()),
      desc:$.trim($(e.target).find('[name=desc]').val()),
      remark:$.trim($(e.target).find('[name=remark]').val()),
      gender:$.trim($(e.target).find('[name=gender]').val()),
      breed:$.trim($(e.target).find('[name=breed]').val()),
      color:$.trim($(e.target).find('[name=color]').val()),
      typeId:$.trim($(e.target).find('[name=typeId]').val())

    };

    Meteor.call("tagUpdateData", tag,tagNo, function(error, result){
      if (error)
        toastr.error.reason;
        //return throwError(error.reason);

      // show this result but route anyway
      if (result)
        toastr.success('This tag has updated');

      Router.go('tagEditPermission',{no:result.no});


    });

  }
});
