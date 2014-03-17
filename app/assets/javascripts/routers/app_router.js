window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow",
  },
  
  boardsIndex: function () {
    var indexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });
    
    window.Trellino.Collections.boards.fetch();
    this._swapView(indexView);
  },
  
  boardsNew: function () {
    var newView = new Trellino.Views.BoardsNew();
    this._swapView(newView);
  },
  
  boardsShow: function (id) {
    var board = Trellino.Collections.boards.getOrFetch(id);
    
    var showView = new Trellino.Views.BoardsShow({
      model: board
    });
    
    board.fetch();

    this._swapView(showView);
  },
  
  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = newView;
    
    $("body").html(newView.render().$el);
  }
})