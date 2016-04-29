Meteor.publish('tags', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });

  return Tags.find({}, options);
//  return Tags.find({ownerId: this.userId}, options);

});

Meteor.publish("singleTag", function(tagNo){
  check(tagNo, String);
  return  Tags.find({no:tagNo});
});

Meteor.publish('tagSubmit',function(tagNo) {
  check(tagNo, String);
  return  Tags.find({no:tagNo,ownerId: this.userId});
});
/*
Meteor.publish('tagSubmit', function(tagNo) {
  check(tagNo, String);
  return  Tags.find({no:tagNo});
});
*/


Meteor.publish('viewTag', function() {

  return  Tags.find({});

});

Meteor.publish('tagVelify', function() {

  return  Tags.find({status:"inactive",ownerId:{$exists:false}});

});


Meteor.publish('tagPending', function() {

  return  Tags.find({status:"pending"},{history:{$elemMatch:{"status":"pending"}}});

});



Meteor.publish('pets', function(tagNo) {
  check(tagNo, String);
  return Pets.find({tagNo: tagNo});
});

Meteor.publish('singlePet', function(petId) {
  check(petId, String);
  return Pets.find({_id: petId});
});



Meteor.publish('vaccine', function(vacId) {
  check(vacId, String);

  return Tags.find({"vaccines._id":vacId});

});




Meteor.publish("files", function(limit){
  check(limit, Number);

  return FilesStore.find({userId:this.userId},{limit:limit,sort:{uploadedAt:-1}});
});

Meteor.publish("masters", function(){
  //check(language, String);
  //check(filed, String);
  // Master.find({"name":name},{filed:1});
  return  Masters.find({});
});



Meteor.publish("userData", function(){

  if(this.userId){

    return Meteor.users.find({_id:this.userId},{fileds:{'_id':1,'emails':1,'profile':1,'permission':1}});
  }else{
    this.ready();
  }

});



Meteor.publish("allUserData", function(){

    return Meteor.users.find({},{fileds:{'_id':1,'profile':1,'emails':1,'permission':1}});

});

/*
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
*/
