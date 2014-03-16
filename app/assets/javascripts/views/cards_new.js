window.Trellino.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],
  
  initialize: function (options) {
    this.board = options.board;
  },
  
  events: {
    "submit #new-card": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({
      list: this.list
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var cardParams = $(event.currentTarget).serializeJSON()["card"];
    var newCard = new Trellino.Models.Card(cardParams);
  }
});