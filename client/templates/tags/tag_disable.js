Template.tagDisable.onCreated(function() {

  Session.set('tagno',this.data.no);
});

Template.tagDisable.rendered=function() {

};


Template.tagDisable.events({
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


      Meteor.call('tagDisable',tagNo, function(error, result) {

        if (error)
          toastr.error.reason;

        if (result)
          toastr.success('tag already disable');


        Router.go('tagsList');
      });

    }
  }
});
