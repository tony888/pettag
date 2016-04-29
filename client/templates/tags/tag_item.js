Template.tagItem.helpers({
  showTransferButton: function(){
     return this.status === 'active' ;

  },
  showLostButton:function(){
    return this.status === 'active' ||  this.status === 'pending' ;
  },
  showFoundPet:function(){
    return this.status === 'lost';
  },
  showMapPet:function(){
    return this.status === 'inactive';
  }


});

Template.tagItem.events({

});
