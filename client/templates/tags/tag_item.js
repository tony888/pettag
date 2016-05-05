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
  },
  showCancelTransferBTN:function(){
     return this.status === 'pending' ;
  },
  spanTagStatus:function(){
      if(this.status === 'active'){
        return " label label-success ";
      }else if(this.status === 'pending'){
        return " label label-warning";
      }else if(this.status === 'lost'){
        return " label label-danger";
      }else if(this.status === 'inactive'){
        return " label label-info ";
      }
    return
  }


});

Template.tagItem.events({

});
