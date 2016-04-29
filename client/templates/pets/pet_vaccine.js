Template.petVaccine.onCreated(function() {
  Session.set('petSubmitErrors', {});

});

Template.petVaccine.rendered=function() {
	  $('#vaccineDate').datepicker({
      format:"dd-mm-yyyy"
    });
}

Template.petVaccine.helpers({

  errorMessage: function(field) {
    return Session.get('petSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('petSubmitErrors')[field] ? 'has-error' : '';
  }

});

Template.petVaccine.events({
  'submit form': function(e) {
    e.preventDefault();
    var tagNo = $.trim($(e.target).find('[name=tagNo]').val());
    var pet = {
      vaccine:$.trim($(e.target).find('[name=vaccine]').val()),
      vaccineDate:$.trim($(e.target).find('[name=vaccineDate]').val())

    };

    //var TagActive = validateTagActive(tag);


    var errors = validatePetVaccine(pet);
    //  console.log(errors);
    if( errors.vaccine || errors.vaccineDate )
      return Session.set('petSubmitErrors',errors);


    Meteor.call('tagPetVaccine',pet ,tagNo, function(error, result) {

      if (error)
        toastr.error.reason;

      if (result)
        toastr.success('vaccine data already save');
        $('#vaccineDate').val('');
        $('#vaccine').val('');

      //Router.go('petVaccineList',{no:tagNo});

      var sure =  confirm('ต้องการเพิ่มข้อมูลวัคซีนอีกหรือไม่ ? ');

      if(sure){
        Router.go('petVaccine',{no:result.no});
      }else{
        Router.go('petVaccineList',{no:result.no});
      }


    });

  }
});
