Template.gallerySubmit.created = function(){
   var self = this;

   self.limit = new ReactiveVar;
   self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
   Tracker.autorun(function(){
      Meteor.subscribe("files", self.limit.get());
   });


};

Template.gallerySubmit.rendered = function(){
  var self = this;
  $(window).scroll(function(){
    if($(window).scrollTop()+$(window).height() > $(document).height() - 100){
      incrementLimit(self);
    }

  });

};


Template.gallerySubmit.events({
  "change #galleryUpload": function(e){
    var user = Meteor.user();
    var tag_no = $('input[name="tagNo"]').val();

    FS.Utility.eachFile(e,function(f){
      var newFile = new FS.File(f);

      newFile.username = user.username;
      newFile.userId = user._id;
      newFile.tagNo = tag_no;
      newFile.typeName = "gallery";

      FilesStore.insert(newFile,function(error,fileObj){
        if(error){
          toastr.error('Upload failed...');
        }else{


          //Tags.update({tag}, {$addToSet:{"files":{"file_id":fileObj._id,src:"/cfs/files/files/"+fileObj._id}}});

          toastr.success('Upload success');
          var fileId = fileObj._id;
          var src = '/cfs/files/files/'+fileObj._id;
          Meteor.call('tagUpdateGallery',tag_no,fileId,src);
        }
      });

    });

    $('#galleryUpload').val('');
  }
});


Template.gallerySubmit.helpers({
  'gallerys' : function(){
 //console.log(this);
    return FilesStore.find({userId:Meteor.userId(),tagNo:this.no,"typeName":"gallery"},{sort:{uploadedAt:-1}});

  }

});


var incrementLimit = function(){

}
