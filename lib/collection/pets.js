Pets = new Meteor.Collection("pets");

Pets.allow({

  update: function(userId,Pet){
    return ownsDocument(userId,Pet);
  },
  remove: function(userId,Pet){
    return ownsDocument(userId,Pet);
  }
});

Pets.deny({

  update: function(userId,Pet,fieldNames,modifier){
    var errors = validatePet(modifier.$set);
    return errors.title || errors.url;
  }

});

validatePet = function(pet){
  var errors = {};

  if(!pet.tagNo)
      errors.tagNo = "กรุณากรอกรายหมายเลข TAG";

  if(!pet.name)
      errors.name = "กรุณากรอกชื่อสัตว์เลี้ยง";

  if(!pet.dob)
      errors.dob = "กรุณากรอกวันเกิดสัตว์เลี้ยง";

  if(!pet.desc)
      errors.desc = "กรุณากรอกรายละเอียดสัตว์เลี้ยง";


  if(!pet.gender)
      errors.gender = "กรุณากรอกเพศสัตว์เลี้ยง";

  if(!pet.breed)
      errors.breed = "กรุณากรอกสายพันธุ์สัตว์เลี้ยง";

  if(!pet.color)
      errors.color = "กรุณากรอกสีสัตว์เลี้ยง";

  if(!pet.typeId)
      errors.typeId = "กรุณากรอกประเภทสัตว์เลี้ยง";


  return errors;
}


Meteor.methods({
  petInsert: function(petAttributes) {
    check(this.userId, String);
    check(petAttributes, {
      tagNo: String,
      typeId: String,
      name:String,
      dob:String,
      desc:String,
      gender:String,
      breed:String,
      color:String
    });

    var errors = validatePet(petAttributes);
    if(errors.tagNo || errors.typeId || errors.name || errors.dob || errors.gender || errors.breed ||  errors.color )
      throw new Meteor.Error('invalid-insert', "You must set tag no and name for pet ");


    var petWithSameTagNo = Pets.findOne({tagNo: petAttributes.tagNo.trim()});
    if (petWithSameTagNo) {
      return {
        postExists: true,
        _id: petWithSameTagNo._id
      }
    }

    var user = Meteor.user();
    var pet = _.extend(petAttributes, {
      ownerId: user._id,
      createUser: user.username,
      createDttm:new Date()

    });
    //function(ownerId,Tag,fieldNames,modifier)

    var petId = Pets.insert(pet);

  //  Tags.update({no:pet.tagNo},{$set:{ownerId:user._id,petId:petId,status:"Active"}});

    return {
      _id: petId
    };
  }
});
