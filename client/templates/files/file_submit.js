
Template.fileSubmit.created = function(){
   var self = this;

   self.limit = new ReactiveVar;
   self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
   Tracker.autorun(function(){
      Meteor.subscribe("files", self.limit.get());
   });


};

Template.fileSubmit.rendered = function(){
  var self = this;
  $(window).scroll(function(){
    if($(window).scrollTop()+$(window).height() > $(document).height() - 100){
      incrementLimit(self);
    }

  });

};



Template.fileSubmit.events({
  "dropped #dropzone": function(e){
    var user = Meteor.user();
   var tag_no = $('input[name="tagNo"]').val();

    FS.Utility.eachFile(e,function(f){
      var newFile = new FS.File(f);

      newFile.username = user.username;
      newFile.userId = user._id;
      newFile.tagNo = tag_no;

      FilesStore.insert(newFile,function(error,fileObj){
        if(error){
          toastr.error('Upload failed...');
        }else{
          toastr.success('Upload success');
        }
      });


    });
  }
});


Template.fileSubmit.helpers({
  'files' : function(){

    return FilesStore.find({},{sort:{uploadedAt:-1}});

  }

});


var incrementLimit = function(){

}
