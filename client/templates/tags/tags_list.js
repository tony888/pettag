Template.tagsList.onCreated(function() {
  var template = this;

  template.autorun(function() {
    var skipItem = (currentPage() - 1) * Meteor.settings.public.recordsPerPage;
    template.subscribe('tags', skipItem);
  });
});


Template.tagsList.helpers({
  tags: function() {
      return Tags.find({});
  },
  prevPage: function() {

    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    return Router.routes.tagsList.path({page: previousPage});
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 :currentPage();
    return Router.routes.tagsList.path({page: nextPage});
  },
  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

var currentPage = function() {
  return parseInt(Router.current().params.page) || 1;
}

var hasMorePages = function() {

  var totalTags = Counts.get('TagCount');
  return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalTags;
}
