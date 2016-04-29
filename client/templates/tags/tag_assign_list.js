Template.tagAssingList.onCreated(function() {

});

Template.tagAssingList.helpers({
/*  tags:function(){
    var r = Tags.find({"history.assigneeID":Meteor.userId()});
    console.log(r);

  }
  */

  history: function(){

    var r = Tags.findOne({"no":this.no,"history.assigneeID": Meteor.userId()},{"_id":0,"no":1,"history":{$elemMatch:{"status":"pending"}}});

    his =_.find(r.history,function(history){return history.status==='pending'});

    return his;


  }
});

Template.tagAssingList.events({
  "click .btn-success": function(event, template){
  //  console.log(this);

    var hid = $(event.target).data("hid");

  //  console.log(hid);

    Meteor.call("tagAcceptTransfer", hid, function(error, result){
      if(error){
        toastr.error.reason;
      }
      if(result){
        toastr.success('Tag transfer complete');
      }

        Router.go('tagsList');
    });

  },

  "click #btnCancel": function(event, template){
    var hid = $(event.target).data("hid");

    Meteor.call("tagCancelTransfer", hid, function(error, result){
      if(error){

          toastr.error.reason;
      }

      if(result){
        toastr.success('cancel transfer');

      }

      Router.go('tagsList');


    });
  }
});
