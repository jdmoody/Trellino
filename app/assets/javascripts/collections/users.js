window.Trellino.Collections.Users = Backbone.Collection.extend({
  model: Trellino.Models.User,
  
  url: "/users",
  
  getOrFetch: function (email) {
    var model;
    var users = this;

    if (model = this.get(email)) {
      model.fetch();
      return model;
    } else {
      model = new Trellino.Models.User({ email: email });
      model.fetch({
        success: function () { users.add(model) }
      });
      return model;
    }
  }
});