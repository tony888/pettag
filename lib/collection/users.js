validateRegister=function(user){
  var errors={};

  if(!user.emails){
    errors.emails = "กรุณากรอก email";
  }else if(chkDupicateEmail(user.emails)){
    errors.emails = "email ซ้ำ";
  }


/*
   if(!chkEmail(user.email)){
    errors.email = "email ไม่ถูกต้อง" ;
  }
*/
  if(!user.password1){
      errors.password1 = "กรุณากรอก password";
  }else if(!chkLenght(user.password1)){
      errors.password1 = "password ต้องมีความยาวตั้งแต่ 6 ตัวอักษร";
  }
  if(!user.password2){
      errors.password2 = "กรุณา ยืนยันรหัสผ่าน";
  }else if(user.password1 !== user.password2){
      errors.password2 = "password ไม่ตรงกัน";
 }

  if(!user.name)
      errors.name = "กรุณาชื่อ-นามสกุล";

  if(!user.tel)
      errors.tel = "กรุณากรอกเบอร์โทรศัพท์";

/*  if(!user.address)
      errors.address = "กรุณากรอกที่อยู่"; */

  return errors;
};

validateLogin=function(user){
  var errors={};

  if(!user.email){
    errors.email = "กรุณากรอก email";
  }else if(!chkDupicateEmail(user.email)){
    errors.email = "ไม่พบ email นี้ในระบบ";
  }

  if(!user.password){
      errors.password = "กรุณากรอก password";
  }

  return errors;
};

validateProfile=function(emails,name,tel){
  var errors={};

  if(!emails){
    errors.email = "กรุณากรอก email";
  }else if(chkDupicateEmail(emails)){
    errors.email = "email ซ้ำ";
  }

  if(!name){
      errors.name = "กรุณากรอก ชื่อ-นามสกุล";
  }

  if(!tel){
      errors.tel = "กรุณากรอก เบอร์โทรศัพท์ ";
  }


  return errors;
};


  chkEmail=function(email){
    var pattern = "/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/";
    email = new RegExp(email,pattern)


    if(reg.Match(email)){

      return true;
    }else{
      return false;
    }

  };

  chkLenght=function(password){
    if(password.length >=6){
      return true;
    }else{
      return false;
    }
  };

chkDupicateEmail=function(email){

  var res = Meteor.users.find({"emails.address":email}).count();
  if(res>0){
    return true;
  }

  return false;
};



Meteor.methods({
  createUsers:function(emails,password,name,address,tel){

    check(emails,String);
    check(password,String);
    check(name,String);
    check(address,String);
    check(tel,String);

    var options={
      email:emails,
      password:password,
      profile:[{'name':name,'address':address,'tel':tel,'email':emails}]

    }
    var uid  = Accounts.createUser(options);

     return uid;
  },
  editUsers:function(email,name,address,tel){

    check(email,String);
    check(name,String);
    check(address,String);
    check(tel,String);


    var uid = Meteor.userId();


        var errors = validateProfile(email,name,tel);

        if( errors.name || errors.email ||  errors.tel)
            throw new Meteor.Error('invalid-insert', "You must set user from UI ");


    Meteor.users.update({"_id":uid},{
       $set:{
            "emails.0.address":email,
            "profile.0.name":name,
             "profile.0.tel":tel,
             "profile.0.address":address,
            "profile.0.email":email
            }
    });


     return uid;
  },


  userPermission:function(user){
    check(user,{
      name:Boolean,
      tel:Boolean,
      addr:Boolean,
      email:Boolean
    });
    var uid = Meteor.userId();

      Meteor.users.update({
        "_id":uid
      },{
        $set:{
          "permission":user
        }
      });

      return uid;
  }
});
