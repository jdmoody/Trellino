window.Trellino.Views.BoardsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  template: JST["boards/index"],
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});