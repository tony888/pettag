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
//  "change #fileupload": function(e){
"click #btnUpload": function(e){
    var user = Meteor.user();
    var tag_no = $('input[name="tagNo"]').val();
    var file_name = $('input[name="txtFileName"]').val();
    var file_upload = $('input[name="fileupload"]');

    var f= file_upload[0].files;

    for (var i = 0, ln = file_upload.length; i < ln; i++) {

        var newFile = new FS.File(f[i]);

        newFile.username = user.username;
        newFile.userId = user._id;
        newFile.tagNo = tag_no;
        newFile.fileName = file_name;
        newFile.typeName = "file";

        FilesStore.insert(newFile,function(error,fileObj){
          if(error){
            toastr.error('Upload failed...');
          }else{


            //Tags.update({tag}, {$addToSet:{"files":{"file_id":fileObj._id,src:"/cfs/files/files/"+fileObj._id}}});

            toastr.success('Upload success');
            var fileId = fileObj._id;
            var src = '/cfs/files/files/'+fileObj._id;

            Meteor.call('tagUpdateFile',tag_no,fileId,src,file_name);
          }
        });

    }

    $('input[name="fileupload"]').val('');
    $('input[name="txtFileName"]').val('');
  }
});


Template.fileSubmit.helpers({
  'files' : function(){
 //console.log(this);
    return FilesStore.find({userId:Meteor.userId(),tagNo:this.no,typeName:"file"},{sort:{uploadedAt:-1}});

  }

});


var incrementLimit = function(){

}
