Meteor.publish('tags', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Tags.find({ownerId: this.userId}, options);

});

Meteor.publish("singleTag", function(tagNo){
  check(tagNo, String);
  return  Tags.find({no: tagNo});
});

Meteor.publish('pets', function(tagNo) {
  check(tagNo, String);
  return Pets.find({tagNo: tagNo});
});

Meteor.publish('singlePet', function(petId) {
  check(petId, String);
  return Pets.find({_id: petId});
});

Meteor.publish("files", function(limit){
  check(limit, Number);

  return FilesStore.find({},{limit:limit,sort:{uploadedAt:-1}});
});
/*
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
*/
