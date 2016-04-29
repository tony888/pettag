Template.tagLost.onCreated(function() {

  Session.set('tagno',this.data.no);
});

Template.tagLost.rendered=function() {

};


Template.tagLost.events({
  'change #chk_disable':function(e,t){
      e.preventDefault();
      var chk = t.$("#chk_disable").is(":checked");
      if(chk){

        $("input[type='submit']").removeAttr('disabled');
      }else{
        $("input[type='submit']").attr('disabled');
      }

  },

  'submit form': function(e) {
    e.preventDefault();
    var sure = confirm("ต้องการเปลี่ยนสถานะ Tag ? ");
      if(sure===true){


      var tagNo = Session.get('tagno');
      //console.log(tagNo);


      Meteor.call('tagLost',tagNo, function(error, result) {

        if (error)
          toastr.error.reason;

        if (result)
          toastr.success('เปลี่ยนสถานะ tag แล้ว');


        Router.go('tagsList');
      });

    }
  }
});
