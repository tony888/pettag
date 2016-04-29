Template.petEditVaccine.onCreated(function() {
  Session.set('petSubmitErrors', {});
  Session.set('vacId',this.data);
});

Template.petEditVaccine.rendered=function() {
	  $('#vaccineDate').datepicker({
      format:"dd-mm-yyyy"
    });
}

Template.petEditVaccine.helpers({

  errorMessage: function(field) {
    return Session.get('petSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('petSubmitErrors')[field] ? 'has-error' : '';
  },
  tagno:function(){
    var vac_id = Session.get('vacId');
    var result =Tags.findOne({"vaccines._id":vac_id},{"_id":0,"no":1});

    //console.log(result.no);
    return result.no;

  },
  vaccine: function(){

    var vac_id = Session.get('vacId');
    //console.log(vac_id);

    var r = Tags.findOne({"vaccines._id":vac_id},
    {"_id":0,"no":1,vaccines:{$elemMatch:{"_id":vac_id}}});
    //console.log(r);

    vaccine =_.find(r.vaccines,function(vaccine){return vaccine._id===vac_id});
    //console.log(vaccine);
    return vaccine;


  }

});

Template.petEditVaccine.events({
  'submit form': function(e,t) {
    e.preventDefault();


    var tagNo = $.trim(t.find('[name=tagNo]').val());
    var pet = {
      _id:$.trim($(e.target).find('[name=vacId]').val()),
      vaccine:$.trim($(e.target).find('[name=vaccine]').val()),
      vaccineDate:$.trim($(e.target).find('[name=vaccineDate]').val())

    };

    //var TagActive = validateTagActive(tag);


    var errors = validatePetVaccine(pet);
    //  console.log(errors);
    if( errors.vaccine || errors.vaccineDate )
      return Session.set('petSubmitErrors',errors);


    Meteor.call('tagPetVaccineEdit',pet ,tagNo, function(error, result) {
      // display the error to the user and abort
      if (error)
        toastr.error.reason;
        //return throwError(error.reason);

      // show this result but route anyway
      if (result)
        toastr.success('vaccine data already update');


      Router.go('petVaccineList',{no:result.no});
    });

  }
});
