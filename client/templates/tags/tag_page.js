Template.tagPage.helpers({
  transferHistory:function(){

    return Meteor.users.findOne({_id:"recordId"});

  },
  findUserName:function(){

    res = Tags.findOne({no:this.no},{history:1});
    r = res.history;
    x = _.each(r,function(r){
      console.log(r);



    });
  //  console.log(x);

    //return
  }



});
