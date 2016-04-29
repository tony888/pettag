Template.tagTransfer.onCreated(function() {
  Session.set('petSubmitErrors', {});
  Session.set('tagno', this.data.no);

});

Template.tagTransfer.rendered=function() {

}



Template.tagTransfer.helpers({
  errorMessage: function(field) {
    return Session.get('petSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('petSubmitErrors')[field] ? 'has-error' : '';
  },
  getSelect:function(filed){
    return  Masters.find({"name":"master"},{filed:1});
  }

});



Template.tagTransfer.events({
  'submit form': function(e) {
    e.preventDefault();
    var errors= {};
    var tagno = $.trim($(e.target).find('[name=tagNo]').val());

    var assigneeEmail = $.trim($(e.target).find('[name=email]').val());
    var len = assigneeEmail.length;

    //var TagActive = validateTagActive(tag);


    if(!len){
       errors.email = "กรุณากรอก email ผู้รับโอน";
       return Session.set('petSubmitErrors',errors);
    }

    if(assigneeEmail===Meteor.user().emails[0].address ){
       errors.email = " email ตรงกับผู้โอน ";
       return Session.set('petSubmitErrors',errors);
    }
    var chkExsist = Meteor.users.find({"emails.address":assigneeEmail}).count();

    if(!chkExsist){
       errors.email = "ไม่พบ email ผู้รับโอน";
       return Session.set('petSubmitErrors',errors);
    }

    var assigneeID = Meteor.users.findOne({"emails.address":assigneeEmail},{"users._id":1});

    //console.log(Session.get('tagno'));


    Meteor.call('tagPending',  tagno, assigneeID._id, assigneeEmail,function(error, result) {
      // display the error to the user and abort
      if (error)
        toastr.error.reason;
        //return throwError(error.reason);

      // show this result but route anyway
      if (result)
        toastr.success('This tag wait to transfer');

      Router.go('tagsList');
    });



  }
});
