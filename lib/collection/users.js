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

  if(!user.address)
      errors.address = "กรุณากรอกที่อยู่";

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

  var r = Meteor.users.find({"emails.address":email}).count();
  if(r>0){
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
  editUsers:function(emails,password,name,address,tel){

    check(emails,String);
    check(password,String);
    check(name,String);
    check(address,String);
    check(tel,String);

    var uid = Meteor.userId();
    var options={
      email:emails,
      password:password,
      profile:[{'name':name,'address':address,'tel':tel,'email':emails}]
    };

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
