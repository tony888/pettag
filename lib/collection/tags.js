Tags = new Meteor.Collection("tags");

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
      return  errors.tagNo ;
    }

  });



  validateTag = function(tag){
    var errors = {};

    if(!tag.name)
        errors.name = "กรุณากรอกชื่อสัตว์เลี้ยง";

    if(!tag.age)
        errors.age = "กรุณากรอกอายุสัตว์เลี้ยง";

   if(!tag.typeId)
        errors.typeId = "กรุณากรอกประเภทสัตว์เลี้ยง";

   if(!tag.gender)
        errors.gender = "กรุณากรอกเพศสัตว์เลี้ยง";

   /*
    if(!tag.height)
        errors.height = "กรุณากรอกความสูงสัตว์เลี้ยง";

    if(!tag.weight)
        errors.weight = "กรุณากรอกน้ำหนักสัตว์เลี้ยง";


    if(!tag.breed)
        errors.breed = "กรุณากรอกสายพันธุ์สัตว์เลี้ยง";

    if(!tag.color)
        errors.color = "กรุณากรอกสีสัตว์เลี้ยง";

   */

    return errors;
  }

  validatePetVaccine = function(pet){
    var errors = {};
    if(!pet.vaccine)
        errors.vaccine = "กรุณากรอกชื่อวัคซีน";

    if(!pet.vaccineDate)
        errors.vaccineDate = "กรุณากรอกวันที่รับวัคซีน";

      return errors;
  }

  verifyTag = function(tag){
      //console.log(tag);

      var errors = {};

      var tag_no = tag.tagNo.trim();
      var tag_serial = tag.serial.trim();
      /*
      resultTag = Tags.find({no:tag_no}).count();
      if(resultTag){
        resultTag_Serial = Tags.find({$and:[{no:tag_no},{serial:tag_serial}]}).count();
        if(!resultTag_Serial)
          errors.serial = 'serial ไม่ถูกต้อง';

      }else{
        errors.tagNo ='Tag no ไม่ถูกต้อง';
      }*/
      //console.log(resultTag);

      var cntTag = Tags.find({no:tag_no}).count();
      var cntTagStatus = Tags.find({$and:[{no:tag_no},{status:'inactive'}]}).count();
      var cntTagSerial = Tags.find({no:tag_no,serial:tag_serial}).count();

      if(!cntTag){
         errors.tagNo = "หมายเลข TAG นี้ไม่มีอยู่ในระบบ";
      }else if(!cntTagStatus){
         errors.tagNo = "หมายเลข TAG นี้มีการใช้งานแล้ว";
      }else if(!cntTagSerial){
         errors.serial = "กรอก Serail ผิด กรุณากรอกใหม่";
      }


      return errors;
  }

 duplicateTag = function(tag){
   var errors = {};

   var resultTag = Tags.findOne({$and:[{no:tag.tagNo.trim()},{status:{$nin:['inactive']}}]});
   //console.log(resultTag);
   if (resultTag)
      errors.tagNo = "tag ซ้ำ ";

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

    var errors = validateTag(tagAttributes);
    if(errors.status || errors.ownerId || errors.petId)
      throw new Meteor.Error('invalid-insert', "You must set status from tag ");


    var user = Meteor.user();
    var pet = _.extend(tagAttributes, {
      ownerId: user._id,
      createUser: user.username,
      createDttm:new Date()

    });

    var petId = Pets.insert(pet);

    return {
      _id: petId
    };
  },

  tagMapPet:function(tagAttributes,tagNo){
    check(this.userId, String);
    check(tagNo, String);
    check(tagAttributes, {
      typeId: String,
      name:String,
      dob:String,
      age:String,
      appearance:String,
      desc:String,
      remark:String,
      gender:String,
      breed:String,
      color:String,
      weight:String,
      microship:String,
      height:String
    });


    var errors = validateTag(tagAttributes);


    if(errors.typeId || errors.name || errors.age ||
       errors.gender || errors.breed ||  errors.color ||
     errors.height || errors.weight )
      throw new Meteor.Error('invalid-insert', "You must set tag no from UI ");


    var pet = tagAttributes;

    var user = Meteor.user();
    /*var pet = _.extend(tagAttributes, {
        ownerId: user._id,
        createUser: user.username,
        status:"active",
        createDttm:new Date()

    });
    */

    tagId = Tags.update({no:tagNo},{
      $set:{
        pet,
        status:"active",
        createDttm:new Date(),
        ownerId: user._id
      }

    });

    return {
      no:tagNo
    };
  },

  tagVelify:function(tag){
    //check(this.userId, String);
    check(tag, {
      tagNo: String,
      serial:String,
    });

    var errors = {};
    if(!tag.tagNo)
        errors.tagNo = "กรุณากรอกรายหมายเลข TAG";

    if(!tag.serial)
        errors.serial = "กรุณากรอก serial number";

    if(errors.tagNo || errors.serial )
      throw new Meteor.Error('invalid-insert', "You must set tag no from UI ");

    /*var user = Meteor.user();
    tagId = Tags.update({no:tag.tagNo,serial:tag.serial},{
      $set:{
        ownerId: user._id,
        createDttm:new Date()
      }

    });*/

    return {
      no: tag.tagNo
    };


  },

  tagUpdateFile:function(tagNo,fileId,src,fileName){
    check(tagNo, String);
    check(fileId, String);
    check(src, String);

    check(fileName, String);

    Tags.update({"no":tagNo},{$addToSet:{files:{"file_id":fileId,"src":src,"file_name":fileName,"type":"doc"}}});

    return {
      no:tagNo
    };
  },
  tagRemoveFile:function(tagNo,fileId){
    check(tagNo, String);
    check(fileId, String);

    Tags.update({"no":tagNo},{$pull:{files:{"file_id":fileId}}});

    return {
      no:tagNo
    };
  },
  tagUpdateProfileImage:function(tagNo,fileId,src){
    check(tagNo, String);
    check(fileId, String);
    check(src, String);


    Tags.update({"no":tagNo},{$set:{profile:{"file_id":fileId,"src":src,"type":"profile"}}});

    return {
      no:tagNo
    };
  },

  tagRemoveProfileImage:function(tagNo,fileId){
    check(tagNo, String);
    check(fileId, String);

    Tags.update({"no":tagNo},{$unset:{profile:""}});

    return {
      no:tagNo
    };
  },
  tagUpdateGallery:function(tagNo,fileId,src){
    check(tagNo, String);
    check(fileId, String);
    check(src, String);


    Tags.update({"no":tagNo},{$addToSet:{gallery:{"file_id":fileId,"src":src,"type":"gallery"}}});

    return {
      no:tagNo
    };
  },

  tagRemoveGallery:function(tagNo,fileId){
    check(tagNo, String);
    check(fileId, String);

    Tags.update({"no":tagNo},{$pull:{gallery:{"file_id":fileId}}});

    return {
      no:tagNo
    };
  },

  tagSetPermission:function(tagPermission,tagNo){
  //  console.log(tagPermission);
    check(this.userId, String);
    check(tagNo, String);

    check(tagPermission,{
      appearance:Boolean,
      breed:Boolean,
      age:Boolean,
      chk_tagNo:Boolean,
      color:Boolean,
      desc:Boolean,
      dob:Boolean,
      gender:Boolean,
      height:Boolean,
      weight:Boolean,
      microship:Boolean,
      name:Boolean,
      remark:Boolean,
      typeId:Boolean

    });

    var user = Meteor.user();
    var tag = _.extend(tagPermission, {
      updateId: user._id,
      updateDttm:new Date()
    });

      tagId = Tags.update({"no":tagNo,"ownerId" : this.userId},{
        $set:{
          "permission":tag,
        }

      });

      return {
        no:tagNo
      };

  },

  tagUpdateData:function(tag,tagNo){

      check(this.userId, String);
      check(tagNo, String);
      check(tag, {
        typeId: String,
        name:String,
        dob:String,
        appearance:String,
        microship:String,
        desc:String,
        remark:String,
        gender:String,
        breed:String,
        color:String,
        weight:String,
        height:String
      });

      var user = Meteor.user();
      var tag = _.extend(tag, {
        updateId: user._id,
        updateDttm:new Date()
      });

      tagId = Tags.update({no:tagNo,ownerId:this.userId},{
        $set:{
          "pet":tag
        }

      });

      return {
        no:tagNo
      };
    },

    tagPetVaccine:function(pet,tagNo){

        check(this.userId, String);
        check(tagNo, String);
        check(pet, {
          vaccine: String,
          vaccineDate:String,

        });

        var user = Meteor.user();
        var pet = _.extend(pet, {
          createId: user._id,
          createDttm:new Date()
        });


        tagId = Tags.update({no:tagNo,ownerId:this.userId},{
          $addToSet:{
            "vaccines":{
              "_id":Random.id(),
              "vaccine":pet.vaccine,
              "vaccineDate":pet.vaccineDate,
              "createId":pet.createId,
              "createDttm":pet.createDttm
            }
          }

        });

        return {
          no:tagNo
        };
      },

      tagPetVaccineEdit:function(pet,tagNo){

          check(this.userId, String);
          check(tagNo, String);

          check(pet, {
            _id:String,
            vaccine: String,
            vaccineDate:String,

          });

          var user = Meteor.user();
          var pet = _.extend(pet, {
            updateId: user._id,
            updateDttm:new Date()
          });


          tagId = Tags.update({no:tagNo,ownerId:this.userId,"vaccines._id":pet._id},{
            $set:{

                "vaccines.$.vaccine":pet.vaccine,
                "vaccines.$.vaccineDate":pet.vaccineDate,
                "vaccines.$.updateId":pet.updateId,
                "vaccines.$.updateDate":pet.updateDttm

            }

          });

          return {
            no:tagNo
          };
        },

        tagPetVaccineDelete:function(vacId,tagNo){

            check(this.userId, String);
            check(vacId, String);
            check(tagNo, String);

            tagId = Tags.update({no:tagNo,ownerId:this.userId},{
              $pull :{
                  "vaccines":{"_id":vacId}
                  }

            });

            return {
              no:tagNo
            };
          },

          tagDisable:function(tagNo){
            check(tagNo,String);

            tagId = Tags.update({'no':tagNo},{$set:{'status':'disable'}});

            return {
              no:tagNo
            };

          },
          tagLost:function(tagNo){
            check(tagNo,String);

            tagId = Tags.update({'no':tagNo},{$set:{'status':'lost'}});

            return {
              no:tagNo
            };

          },
          tagActive:function(tagNo){
            check(tagNo,String);

            tagId = Tags.update({'no':tagNo},{$set:{'status':'active'}});

            return {
              no:tagNo
            };

          },

          tagPending:function(tagNo,assigneeID,email){
          //  console.log(Match.test(tagNo, String));

            check(tagNo, String);
            check(assigneeID, String);
            check(email, String);

            tagId = Tags.update({no:tagNo},{
              $set:{'status':'pending'},
              $addToSet:{
                'history':{
                  'hid':Random.id(),
                  'assignorID':Meteor.userId(),
                  'assigneeID':assigneeID,
                  'email':email,
                  'status':'pending',
                  'createDttm':new Date(),
                  'createUser':Meteor.userId()
                }
              }

            });

            return {
              no:tagNo
            };

          },
          addNotify:function(assigneeID,str){
            check(assigneeID, String);
            check(str, String);

            uid = Meteor.users.update({'_id':assigneeID},{
              $addToSet:{
                'notifications':{
                  'nid':Random.id(),
                  'str':str,
                  'read':false,
                  'createDttm':new Date()
                }
              }
            });

            return {
              no:uid
            };

          },
          tagAcceptTransfer:function(historyID){

            check(historyID, String);

            tagId = Tags.update({'history.hid':historyID},{
              $set:{
                'ownerId':Meteor.userId(),
                'status':'active',
                'history.$.status':'accept',
                'history.$.updateDttm':new Date(),
                'history.$.updateUser':Meteor.userId()
              }

            });

            return {
              no:historyID
            };

          },
          tagCancelTransfer:function(historyID){
            check(historyID, String);

            tagId = Tags.update({'history.hid':historyID},{
              $set:{
                'status':'active',
                'history.$.status':'cancel',
                'history.$.updateDttm':new Date(),
                'history.$.updateUser':Meteor.userId()
              }

            });
            return {
              no:historyID
            };

          },

          tagSaveLoacation:function(tagNo,location){
            check(tagNo, String);
            check(location, {
              lat:Number,
              long: Number

            });

            Tags.update({'no':tagNo},{$set:{"location":location}});
            return {
              no:tagNo
            };

          }




});
