Template.filesList.helpers({
  postDate: function(date) {
    return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
  },
  ownsFile:function(){
      return this.userId === Meteor.userId();
  }

});


Template.filesList.events({
  "click .delete-image": function(e){
     e.preventDefault();
     var tag_no = $("input[name=tagNo]").val();
     var sure = confirm("ต้องการลบ file นี้ ? ");
     var fileId = this._id;

     if(sure===true){
       FilesStore.remove({_id:this._id},function(error,result){

         if(error){
           toastr.error("เกิดข้อผิดพลาด !! "+error);
         }else{

           Meteor.call("tagRemoveFile", tag_no,fileId, function(error, result){
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

  }



});
