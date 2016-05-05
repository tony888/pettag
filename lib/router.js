Router.configure({
  //layoutTemplate:"layout",
  loadingTemplate:'loading',
  notFoundTemplate:'notFound',

  waitOn:function(){
    //return [Meteor.subscribe("tags")];
    //return [Meteor.subscribe("notifications")]

  }

});


/*
TagsListController = RouteController.extend({
  template:'tagsList',
  page:this.params.page,
  limitNumber:Meteor.settings.public.recordsPerPage,
  skipItem:(limitNumber*(pages-1)),

  findOptions: function() {
    return  {sort: {no: -1} ,limit:limitNumber,skip:skipItem};
  },
  subscriptions: function() {
    this.tagsSub =  Meteor.subscribe('tags', this.findOptions());

  },
  tags:function(){

    return Tags.find({ownerId:Meteor.userId(),status:{$nin:['disable']}},this.findOptions());
  },

  data: function() {

    return {
      tags: this.tags(),

      ready: this.tagsSub.ready


    };
  }
});
*/
/* route แสดงข้อมูล tag ทั้งหหมด*/


Router.route('/tagsList/:page?',{
  name:'tagsList',
  layoutTemplate:"layout"
 /*  ,  waitOn: function() {
    console.log(this.params.page);
    var pages = parseInt(this.params.page) || 1;
    var limitNumber=10;

    var skipItem =  limitNumber * (pages-1) ;

    return  Meteor.subscribe('tags',{sort: {no: -1}, limit:limitNumber,skip:skipItem});
  },
  data: function() {
    return Tags.find({ownerId:Meteor.userId(),status:{$nin:['disable']}}
    //,{sort: {no: -1} ,limit:limitNumber,skip:skipItem}
    );
  }
  */

});



/* route แก้ไขข้อมูล tag */
Router.route("/tags/:no/edit",{
  name:'tagEdit',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
       Meteor.subscribe("masters"),
       Meteor.subscribe("singleTag", this.params.no),
       Meteor.subscribe("files",10)

     ];

  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data:function(){
    return Tags.findOne({no:this.params.no,"ownerId":Meteor.userId(),status:{$nin:['disable']}});
  }
});


/* route แสดงข้อมูลแต่ละ tag */
Router.route("/tags/:no",{
  name:'tagPage',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no,"ownerId":Meteor.userId(),status:{$nin:['disable']}});
  }
});

/*
Router.route('/submit',{
  name:'petSubmit',
  waitOn:function(){
    return [
      Meteor.subscribe("masters"),
      Meteor.subscribe("tagSubmit")
    ];
  }
});
*/


/* route รายละเอียด vaccine ทั้งหมด */
Router.route('/vaccineList/:no',{
  name:'petVaccineList',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no)

    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}},{sort: {vaccineDate: -1}});

  }

});



/* route แก้ไขรายละเอียด vaccine */
Router.route('/vaccine/:vac_id/edit',{
  name:'petEditVaccine',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("vaccine", this.params.vac_id)

    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({"vaccines._id":this.params.vac_id,status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});

    return this.params.vac_id;

  }

});

/* route รายละเอียด vaccine แต่ละรายการ */
/*
Router.route('/vaccine/:no/:_id',{
  name:'petVaccineDetail',
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no,ownerId:Meteor.userId(),"vaccines._id":this.params._id});

  }

});
*/

/* route เพิ่มข้อมูล vaccine */
Router.route('/vaccine/:no',{
  name:'petVaccine',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}});

  }

});

/* route แก้ไขข้อมูล permission */
Router.route('/permission/:no/edit',{
  name:'tagEditPermission',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tags');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}});

  }

});

/* route เพิ่มข้อมูล permission */
Router.route('/permission/:no',{
  name:'tagPermission',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tags');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no,ownerId:Meteor.userId(),status:{$nin:['disable']}});

  }

});

/* route เพิ่มข้อมูล pet */
Router.route("/submit/:no",{
  name:'petSubmit',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("masters"),
      Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isInActive = Tags.find({no:this.params.no,status:'inactive'}).count();

    if(!isInActive){
      Router.go('activeTag');
      //this.render('tags');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});
    return Tags.findOne({no:this.params.no});

  }
});


/* route  เปลี่ยนะสถานะ จาก tag หาย เป็น active*/
Router.route("/active/:no",{
  name:'tagActive',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
        Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});

    return Tags.findOne({no:this.params.no,"ownerId":Meteor.userId(),status:{$nin:['disable']}});

  }
});
/* route  tag หาย */

Router.route("/lost/:no",{
  name:'tagLost',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
        Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});

    return Tags.findOne({no:this.params.no,"ownerId":Meteor.userId(),status:{$nin:['disable']}});

  }
});


/* route  ยกเลิกการใช้ tag */
Router.route("/disable/:no",{
  name:'tagDisable',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
        Meteor.subscribe("singleTag", this.params.no)
    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});

    return Tags.findOne({no:this.params.no,"ownerId":Meteor.userId(),status:{$nin:['disable']}});

  }
});



/* route โอน tag  */


Router.route("/transfer/:no",{
  name:'tagTransfer',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
        Meteor.subscribe("singleTag", this.params.no),
        Meteor.subscribe("allUserData")

    ];
  },
  onBeforeAction:function(){
    var isActive = Tags.find({no:this.params.no,status:{$nin:['disable']}}).count();

    if(!isActive){
      Router.go('disableTag');
      //this.render('tagVelifys');
    }else{
      this.next();
    }
  },
  data: function(){
    //return Posts.findOne({num:this.params.num});

    return Tags.findOne({no:this.params.no,"ownerId":Meteor.userId(),status:'active'});

  }
});







/* route  validate tag  */
Router.route('/validate/:no?',{
  name:'tagVelifys',
  layoutTemplate:"layout",

  waitOn:function(){
    return [
      Meteor.subscribe("tagVelify")
    ];
  },

  data:function(){
    return Tags.findOne({no:this.params.no});
  }


});

/* route  validate tag  */






Router.route('/user/edit',{
  name:'userEdit',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("userData")
    ];
  },
  data:function(){

    return Meteor.users.findOne({"_id":Meteor.userId()});
  }
});

Router.route('/user',{
  name:'userView',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("userData")
    ];
  },
  data:function(){

    return Meteor.users.findOne({"_id":Meteor.userId()});
  }
});


Router.route('/assigneeList',{
  name:'tagAssingList',
  layoutTemplate:"layout",
  waitOn:function(){
    return [

      Meteor.subscribe("tagPending")
    //  Meteor.subscribe("tagPending")

    ];
  },
  data:function(){

    return{
      tags:Tags.find({"status":'pending',"history.assigneeID":Meteor.userId()},{"history":{$elemMatch:{"status":"pending"}}})
    }

  }
});




Router.route('/login/:no',{
  name:'loginAfterVelidate',
  layoutTemplate:"loginLayout",

  waitOn:function(){
    return [

      Meteor.subscribe("allUserData"),
      Meteor.subscribe("tagVelify")
    //  Meteor.subscribe("tagPending")

    ];
  },

  data:function(){
    return Tags.findOne({no:this.params.no,status:'inactive'});
  }
});

/* route login  */
Router.route('/login',{
  name:'login',
  layoutTemplate:"loginLayout",
  waitOn:function(){
    return [

      Meteor.subscribe("allUserData")
    //  Meteor.subscribe("tagPending")

    ];
  }
});


Router.route('/reset-password',{
  name:'resetPassword',
  layoutTemplate:"loginLayout",
  waitOn:function(){
    return [

      Meteor.subscribe("userData")
    //  Meteor.subscribe("tagPending")

    ];
  }
});



Router.route('/register/:no',{
  name:'userRegisterAfterValidate',
  layoutTemplate:"loginLayout",
  waitOn:function(){
    return [

      Meteor.subscribe("allUserData"),
      Meteor.subscribe("tagVelify")
    //  Meteor.subscribe("tagPending")

    ];
  },
  data:function(){
    return Tags.findOne({no:this.params.no,status:'inactive'});
  }

});



Router.route('/register',{
  name:'userRegister',
  layoutTemplate:"loginLayout",
  waitOn:function(){
    return [

      Meteor.subscribe("allUserData")
    //  Meteor.subscribe("tagPending")

    ];
  }

});
Router.route('/user/permission/edit',{
  name:'userEditPermission',
  layoutTemplate:"layout",
  waitOn:function(){
    return [

      Meteor.subscribe("userData")
    //  Meteor.subscribe("tagPending")

    ];
  },
  data:function(){
    return Meteor.users.findOne({"_id":Meteor.userId()});
  }

});

Router.route('/user/permission',{
  name:'userPermission',
  layoutTemplate:"layout",
  waitOn:function(){
    return [

      Meteor.subscribe("userData")
    //  Meteor.subscribe("tagPending")

    ];
  }

});



/* route แจ้ง disable tag  */
Router.route('/disableTag',{
  name:'disableTag',
  layoutTemplate:"normal"

});

Router.route('/activeTag',{
  name:'activeTag',
  layoutTemplate:"normal"

});

Router.route('/inActiveTag',{
  name:'inActiveTag',
  layoutTemplate:"normal"

});

Router.route('/noTag',{
  name:'noTag',
  layoutTemplate:"normal"

});



/* route ดูข้อมูล tag  */
Router.route('/:no',{
  name:'viewTag',
  layoutTemplate:"layout",
  waitOn:function(){
    return [
      Meteor.subscribe("singleTag", this.params.no),
      Meteor.subscribe("allUserData")
    ];
  },
  onBeforeAction:function(){
    //var isActive = Tags.find({no:this.params.no,status:{$nin:['disable']}}).count();
      var res = Tags.findOne({no:this.params.no});
      if(res){
          if(res.status==='inactive'){
            Router.go('tagVelifys',{no:this.params.no});

          }else if(res.status==='disable'){
            Router.go('disableTag');


          }else{
            this.next();
          }
      }else{
        Router.go('noTag');
      }
  },
  data:function(){
    return Tags.findOne({no:this.params.no});
  }

});



var requireLogin = function(){
  if(!Meteor.user()){
    if(Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    }else{
      //this.render('accessDenied');
       Router.go('login');
       this.next();
    }

  }else{
    this.next();
  }
}



//Router.onBeforeAction(requireLogin);

Router.onBeforeAction(requireLogin,{
  except:['viewTag','login','userRegister',
  'tagVelifys','noTag','inActiveTag','activeTag',
  'disableTag','loginAfterVelidate']
});


//Router.onBeforeAction('dataNotFound',{only:'postPage'});

//Router.onBeforeAction(requireLogin,{only:'postSubmit'});
