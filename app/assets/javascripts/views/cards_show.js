window.Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    
    debugger
    
    this.$el.html(renderedContent);
    
    return this;
  }
});