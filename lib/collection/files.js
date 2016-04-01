/*
 var abs_path = "C:/\MeteorProject/\pettag/\.meteor/\local/\build/\programs/\server/\~/\public/\assets";

 var createSquareThumb = function(fileObj, readStream, writeStream) {
   var size = 35;
   if(gm.isAvailable){
     gm(readStream).autoOrient().resize(size, size + '^')
     .gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
   }
 };

 var thumbStore = new FS.Store.FileSystem("thumbs", {
   transformWrite: createSquareThumb,
   path: abs_path
 });
 var photoStore = new FS.Store.FileSystem("files", {
   path: abs_path
 });

 FilesStore = new FS.Collection("files", {
   stores: [ thumbStore, photoStore ]
 });
*/

FilesStore = new FS.Collection("files",{
  stores:[
    new FS.Store.FileSystem("files",{path:"~/public/assets"})

  ],
  filter:{
    allow:{
      contentTypes:['image/*']
    }
  }
});







FilesStore.allow({
  insert: function(userId){
    return userId !== null;
  },
  update: function(userId,file){
    return userId === file.userId;
  },
  remove: function(userId,file){
    return userId === file.userId;
  },
  download:function(userId){
    return true;
  }
  /*,
  remove: function(){
    return true;
  } */
});
