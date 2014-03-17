window.Trellino.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],
  
  initialize: function (options) {
    this.list = options.list;
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
    
    var view = this;
    newCard.save({}, {
      success: function () {
        view.list.cards().add(newCard);
        view.remove();
      }
    });
  }
});