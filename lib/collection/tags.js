Tags = new Meteor.Collection("tags");

/*
Tags.allow({

  update: function(ownerId,Tag){
    return ownsDocument(ownerId,Tag);
  },
  remove: function(ownerId,Tag){
    return ownsDocument(ownerId,Tag);
  }
});

Tags.deny({

  update: function(ownerId,Tag,fieldNames,modifier){
    var errors = validateTag(modifier.$set);
    return errors.status || errors.ownerId || errors.petId;
  }

});



validateTag = function(tag){
  var errors = {};

  if(!tag.status)
      errors.status = "กรุณาเลือก Status Tag";

  if(!tag.ownerId)
      errors.ownerId = "กรุณากรอกชื่อเจ้าของ";

  if(!tag.petId)
      errors.petId = "กรุณาเลือกสัตว์เลี้ยง";

  return errors;
}


Meteor.methods({
  tagInsert: function(tagAttributes) {
    check(this.userId, String);

    check(tagAttributes, {
      tagNo: String,
      status: String,
      ownerId:String,
      petId:String
    });

    var errors = validatePet(tagAttributes);
    if(errors.status || errors.ownerId || errors.petId)
      throw new Meteor.Error('invalid-insert', "You must set status from tag ");


    var tagWithSameTagNo = Tag.findOne({tagNo: tagAttributes.tagNo.trim()});
    if (tagWithSameTagNo) {
      return {
        tagExists: true,
        _id: tagWithSameTagNo._id
      }
    }

    var user = Meteor.user();
    var pet = _.extend(petAttributes, {
      ownerId: user._id,
      createUser: user.username,
      createDttm:new Date()

    });

    var petId = Pets.insert(pet);

    return {
      _id: petId
    };
  }
});
*/
