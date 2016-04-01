Template.tagPage.helpers({
  pets: function(){
    return Pets.find({tagNo: this.no});
  }
});
