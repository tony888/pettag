Masters = new Mongo.Collection('masters');

Masters.allow({

  update: function(userId,Master){
    return ownsDocument(userId,Master);
  },
  remove: function(userId,Master){
    return ownsDocument(userId,Master);
  }
});
