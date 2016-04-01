if (Pets.find().count() === 0) {
  var now = Date.now();

  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);

  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);


  var typeId_1 = PetTypes.insert({
    name:'Dog'

  });
  var type1 = PetTypes.findOne({_id:typeId_1});

  var typeId_2 = PetTypes.insert({
    name:'Cat'

  });
  var type2 = PetTypes.findOne({_id:typeId_2});


  var pet1_id = Pets.insert({
    name:'Dog1',
    dob: new Date(now - 3650 * 3600 * 1000),
    desc:'desc dog 1',
    gender:'M',
    breed:'Golden',
    color:'brown',
    typeId:type1._id,
    tagNo:'10001',
    createDttm:new Date(now - 1000000 * 3600 * 1000),
    createUser:tom._id
  });
var pet1 = Pets.findOne({_id:pet1_id});

var pet2_id =  Pets.insert({
    name:'Cat1',
    dob: new Date(now - 2700 * 3600 * 1000),
    desc:'desc car 1',
    gender:'F',
    breed:'Thai cat',
    color:'white',
    tagNo:'10002',
    typeId:type2._id,
    createDttm:new Date(now - 100000 * 3600 * 1000),
    createUser:sacha._id
  });

  var pet2 = Pets.findOne({_id:pet2_id});



var pet3_id =  Pets.insert({
    name:'Dog2',
    dob: new Date(now - 1800 * 3600 * 1000),
    desc:'desc Dog 2',
    gender:'M',
    breed:'Thai Dog',
    color:'dark brown',
    tagNo:'10003',
    typeId:type1._id,
    createDttm:new Date(now - 10000 * 3600 * 1000),
    createUser:sacha._id
  });

  var pet3 = Pets.findOne({_id:pet3_id});



  Tags.insert({
    no:'10001',
    status:'Active',
    ownerId:tom._id,
    petId:pet1._id
  });


   Tags.insert({
    no:'10002',
    status:'Active',
    ownerId:sacha._id,
    petId:pet2._id
  });

  Tags.insert({
   no:'10003',
   status:'Active',
   ownerId:sacha._id,
   petId:pet3._id
 });



}
