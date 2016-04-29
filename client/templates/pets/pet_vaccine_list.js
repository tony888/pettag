Template.petVaccineList.onCreated(function() {

  Session.set('tagno',this.data.no);
});

Template.petVaccineList.helpers({



});

Template.petVaccineList.events({
  "click [data-action='edit/vaccine']" : function(event, template){
    event.preventDefault();

    Router.go('petEditVaccine',{vac_id:this._id });


  },

  "click [data-action='delete/vaccine']" : function(event, template){
    event.preventDefault();
    var tagNo = Session.get('tagno');
    var vacId = this._id;
    var sure = confirm("ต้องการข้อมูลนี้ ? ");

    if(sure===true){
        Meteor.call('tagPetVaccineDelete',vacId ,tagNo, function(error, result) {

          if (error)
            toastr.error.reason;

          if (result)
            toastr.success('vaccine data already remove');


        });
    }

  }



});
