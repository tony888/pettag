Template.tagVelifys.onCreated(function() {
  Session.set('tagVelifyErrors', {});
});

Template.tagVelifys.helpers({
  errorMessage: function(field) {
    return Session.get('tagVelifyErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tagVelifyErrors')[field] ? 'has-error' : '';
  }

});




Template.tagVelifys.events({
  'submit form': function(e) {
    e.preventDefault();

    var tag = {
      tagNo:$.trim($(e.target).find('[name=tagNo]').val()),
      serial:$.trim($(e.target).find('[name=serial]').val()),

    };

    //var TagActive = validateTagActive(tag);


    var errors = verifyTag(tag);
    if(errors.tagNo || errors.serial)
      return Session.set("tagVelifyErrors", errors);

    var errors = duplicateTag(tag);
  
    if(errors.tagNo)
      return Session.set("tagVelifyErrors", errors);

    Meteor.call('tagVelify', tag, function(error, result) {
      // display the error to the user and abort
      if (error)
        toastr.error.reason;
        //return throwError(error.reason);

      // show this result but route anyway
      if (result)
        toastr.success('ระบุข้อมูลสัตว์เลี้ยง');

      Router.go('petSubmit', {no:tag.tagNo});
    });


    //  Router.go('petSubmit', {no: tag.tagNo});

  }
});
