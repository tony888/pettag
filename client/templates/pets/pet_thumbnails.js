Template.petThumbnails.helpers({
  postDate: function(date) {
    return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
  },
  ownsFile:function(){
      return this.userId === Meteor.userId();
  }

});


Template.petThumbnails.events({
  "click .delete-image": function(e){
     e.preventDefault();

     var sure = confirm("ต้องการลบ file นี้ ? ");
     if(sure===true){
       FilesStore.remove({_id:this._id},function(error,result){
         if(error){
           toastr.error("เกิดข้อผิดพลาด !! "+error);
         }else{
           toastr.success("ลบ file สำเร็จ");
         }
       });

     }

  }

});
