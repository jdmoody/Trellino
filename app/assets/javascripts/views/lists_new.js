window.Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],
  
  initialize: function (options) {
    this.board = options.board;
  },
  
  events: {
    "submit #new-list": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({
      board: this.board
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    
    var listParams = $(event.currentTarget).serializeJSON()["list"];
    var newList = new Trellino.Models.List(listParams);
    
    var view = this;
    newList.save({}, {
      success: function () {
        view.board.lists().add(newList);
        view.remove();
      }
    });
  }
});