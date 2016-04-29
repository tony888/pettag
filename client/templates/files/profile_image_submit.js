Template.profileImageSubmit.created = function(){
   var self = this;

   self.limit = new ReactiveVar;
   self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
   Tracker.autorun(function(){
      Meteor.subscribe("files", self.limit.get());
   });


};

Template.profileImageSubmit.rendered = function(){
  var self = this;
  $(window).scroll(function(){
    if($(window).scrollTop()+$(window).height() > $(document).height() - 100){
      incrementLimit(self);
    }

  });

};


Template.profileImageSubmit.events({
  "change #profileUpload": function(e){
    var user = Meteor.user();
    var tag_no = $('input[name="tagNo"]').val();



    FS.Utility.eachFile(e,function(f){

      var newFile = new FS.File(f);

      newFile.username = user.username;
      newFile.userId = user._id;
      newFile.tagNo = tag_no;
      newFile.typeName = "profile";

      FilesStore.insert(newFile,function(error,fileObj){
        if(error){
          toastr.error('Upload failed...');
        }else{


          //Tags.update({tag}, {$addToSet:{"files":{"file_id":fileObj._id,src:"/cfs/files/files/"+fileObj._id}}});

          toastr.success('Upload success');
          var fileId = fileObj._id;
          var src = '/cfs/files/files/'+fileObj._id;
          Meteor.call('tagUpdateProfileImage',tag_no,fileId,src);

        }
      });

    });

    $('#profileUpload').val('');


  }
});


Template.profileImageSubmit.helpers({
  'profiles' : function(){
 //console.log(this);
    var pid = this.profile.file_id;

    return FilesStore.find({_id:pid},{sort:{uploadedAt:-1}});

  }

});


var incrementLimit = function(){

}
