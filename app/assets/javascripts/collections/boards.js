window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "/boards",
  model: Trellino.Models.Board
});

window.Trellino.Collections.boards = new Trellino.Collections.Boards();