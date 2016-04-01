Router.configure({
  layoutTemplate:"layout",
  loadingTemplate:'loading',
  notFoundTemplate:'notFound',
  waitOn:function(){
    //return [Meteor.subscribe("notifications")]

  }

});



TagsListController = RouteController.extend({
  template:'tagsList',
  increment:5,
  tagsLimit: function() {
    return parseInt(this.params.tagsLimit) || this.increment;
  },
  findOptions: function() {
    return  {sort: {no: -1}, limit: this.tagsLimit()};
  },
  subscriptions: function() {
    this.tagsSub =  Meteor.subscribe('tags', this.findOptions());
  },
  tags:function(){

    return Tags.find({},this.findOptions());
  },
  data: function() {
    var hasMore = this.tags().count() === this.tagsLimit();
    var nextPath = this.route.path({tagsLimit:this.tagsLimit()+this.increment});
    return {
      tags: this.tags(),
      ready: this.tagsSub.ready,
      nextPath:hasMore?nextPath:null

    };
  }
});


Router.route('/tagsList/:tagsLimit?',{
  name:'tagsList'
});


Router.route("/tags/:no",{
  name:'tagPage',
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no),
      Meteor.subscribe("pets", this.params.no)
    ];
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no});
  }
});

Router.route('/tags/:no/edit',{
  name:'tagEdit',
  waitOn:function(){
    return Meteor.subscribe("singleTag", this.params.no);

  },
  data:function(){
    return Tags.findOne({no:this.params.no});
  }
});


Router.route('/submit',{name:'petSubmit'});


Router.route('/login',{name:'login'});




var requireLogin = function(){
  if(!Meteor.user()){
    if(Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    }else{
      this.render('accessDenied');
    }

  }else{
    this.next();
  }
}

Router.onBeforeAction(requireLogin);



//Router.onBeforeAction('dataNotFound',{only:'postPage'});

//Router.onBeforeAction(requireLogin,{only:'postSubmit'});
