/*
Meteor.setInterval(function() {

}, 5000);
*/
Meteor.startup(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
      Session.set('lat', position.coords.latitude);
      Session.set('lon', position.coords.longitude);
  });
});

Template.viewTag.onCreated(function() {

 Session.set('tagno',this.data.no);
 Session.set('ownerId',this.data.ownerId);
});

Template.viewTag.helpers({
  lat: function() { return Session.get('lat'); },
  lon: function() { return Session.get('lon'); },
  profileImage:function() {

    return Tags.findOne({no:Session.get('tagno')},{profile:1});
  },

  owner:function(){

    return Meteor.users.findOne({_id:Session.get('ownerId')},{profile:1});
  },

  isLost:function(){

  }

});






Template.viewTag.events({
  'click #contact':function(e,t){
    if(!Session.get('lat') || !Session.get('lon')){
      navigator.geolocation.getCurrentPosition(function(position) {
          Session.set('lat', position.coords.latitude);
          Session.set('lon', position.coords.longitude);
      });
    }

    var tagNo =  Session.get('tagno');
    var location = {
      lat:Session.get('lat'),
      long:Session.get('lon')
    };
    console.log(location);

    Meteor.call('tagSaveLoacation',tagNo,location, function(error, result) {
      // display the error to the user and abort
      if (error)
        toastr.error.reason;
        //return throwError(error.reason);

      // show this result but route anyway
      if (result)
        toastr.success('sent location to owner');

    });

  }

});
