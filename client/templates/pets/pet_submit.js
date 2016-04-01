Template.petSubmit.onCreated(function() {
  Session.set('petSubmitErrors', {});
});
Template.petSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('petSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('petSubmitErrors')[field] ? 'has-error' : '';
  }


});



Template.petSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var pet = {
      tagNo:$(e.target).find('[name=tagNo]').val(),
      name:$(e.target).find('[name=name]').val(),
      dob:$(e.target).find('[name=dob]').val(),
      desc:$(e.target).find('[name=desc]').val(),
      gender:$(e.target).find('[name=gender]').val(),
      breed:$(e.target).find('[name=breed]').val(),
      color:$(e.target).find('[name=color]').val(),
      typeId:$(e.target).find('[name=typeId]').val()

    };

    var errors = validatePet(pet);
    if(errors.tagNo || errors.typeId || errors.name || errors.dob || errors.gender || errors.breed ||  errors.color )
      return Session.set('petSubmitErrors',errors);

    Meteor.call('petInsert', pet, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');

      Router.go('petPage', {_id: result._id});
    });
  }
});
