Meteor.publish('tags', function(skipItem) {
  var positveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });
  check(skipItem, positveIntegerCheck);
  var limitNumber = parseInt(Meteor.settings.public.recordsPerPage);

  Counts.publish(this, 'TagCount', Tags.find(), {
   noReady: true
 });

  return Tags.find({ownerId: this.userId,status:{$nin:['disable']}},{limit:limitNumber,skip:skipItem,sort:{no:-1}});
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
  //Tags.find({status:"inactive",ownerId:{$exists:false}});
  return  Tags.find({status:"inactive"});

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
