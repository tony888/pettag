Template.userEdit.onCreated(function() {
  console.log(this.data);
});


Template.userEdit.helpers({

});

Template.userEdit.events({
     //'click #': function(e) {
     'submit form':function(event,template) {
       event.preventDefault();

        var z =  $.trim(template.$("#addr").val());


        var userId =  this._id;

        Meteor.users

        Meteor.users.update({"_id":userId}, {
          $set: {
            "profile.address":z
          }
        });



     }
});
