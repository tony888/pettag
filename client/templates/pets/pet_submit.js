Template.petSubmit.onCreated(function() {
  Session.set('petSubmitErrors', {});
  console.log(this);
});

Template.petSubmit.rendered=function() {
	  $('#dob').datepicker({
      format:"dd-mm-yyyy"
    });
}



Template.petSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('petSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('petSubmitErrors')[field] ? 'has-error' : '';
  },
  getSelect:function(filed){
    return  Masters.find({"name":"master"},{filed:1});
  },
  showTagNumber:function(){

  }
});



Template.petSubmit.events({
  'blur #dob':function(e,template){

    //  var x = $.trim($(e.target).find('[name=dob]').val());
      var dob = template.$('#dob').val();
      var age = moment(dob,'DD-MM-YYYY').fromNow(true);
      template.$('#age').val(age);


      /*
      var x = moment(date1, "DD-MM-YYYY").fromNow();
      console.log(x);
      */

  },

  'submit form': function(e) {
    e.preventDefault();
    var tagNo = $.trim($(e.target).find('[name=tagNo]').val());
    var tag = {
      name:$.trim($(e.target).find('[name=name]').val()),
      microship:$.trim($(e.target).find('[name=microship]').val()),
      dob:$.trim($(e.target).find('[name=dob]').val()),
      age:$.trim($(e.target).find('[name=age]').val()),
      height:$.trim($(e.target).find('[name=height]').val()),
      weight:$.trim($(e.target).find('[name=weight]').val()),
      appearance:$.trim($(e.target).find('[name=appearance]').val()),
      desc:$.trim($(e.target).find('[name=desc]').val()),
      remark:$.trim($(e.target).find('[name=remark]').val()),
      gender:$.trim($(e.target).find('[name=gender]').val()),
      breed:$.trim($(e.target).find('[name=breed]').val()),
      color:$.trim($(e.target).find('[name=color]').val()),
      typeId:$.trim($(e.target).find('[name=typeId]').val())

    };

    //var TagActive = validateTagActive(tag);


    var errors = validateTag(tag);
    //  console.log(errors);
    //errors.height|| errors.weight || errors.gender ||errors.breed ||  errors.color
    if( errors.typeId || errors.name ||  errors.age )

      return Session.set('petSubmitErrors',errors);



    Meteor.call('tagMapPet',tag ,tagNo, function(error, result) {
      // display the error to the user and abort
      if (error)
        toastr.error.reason;
        //return throwError(error.reason);

      // show this result but route anyway
      if (result)
        toastr.success('This tag has already been actived');

      Router.go('tagPermission',{no:result.no});
    });

  }
});
