window.Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  events: {
    "click button.destroy-card": "destroy"
  },
  
  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  destroy: function () {
    this.model.destroy();
  }
});