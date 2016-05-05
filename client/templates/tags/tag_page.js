Template.tagPage.helpers({
  transferHistory:function(){

    return Meteor.users.findOne({_id:"recordId"});

  },
  getGenders:function(value){
    var result = Masters.find({"genders.value":value},{"genders.$.name":1,"_id":0});

      return  ;
  },

  findUserName:function(){

    res = Tags.findOne({no:this.no},{history:1});
    r = res.history;
    x = _.each(r,function(r){
    //  console.log(r);



    });
  //  console.log(x);

    //return
  }



});
