window.Trellino.Views.BoardsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },
  
  template: JST["boards/index"],
  
  events: {
    "click button.destroy": "destroy"
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  destroy: function (event) {
    var idx = $(event.currentTarget).data("id") - 1
    Trellino.Collections.boards.models[idx].destroy();
  }
});