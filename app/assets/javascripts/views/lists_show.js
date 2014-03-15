window.Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);

    this.model.cards().each(this.addCard.bind(this));
  },
  
  template: JST["lists/show"],
  
  events: {
    "click button.destroy": "destroy"
  },
  
  render: function () {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    
    this.renderSubviews();
    
    return this;
  },
  
  addCard: function (card) {
    debugger
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card
    });
    
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  },
  
  removeCard: function (card) {
    var cardsShowView =
      _(this.subviews()[".cards"]).find(function (subview) {
        return subview.model == card;
      });
      
    this.removeSubview(".cards", cardsShowView);
  },
  
  destroy: function () {
    this.model.destroy();
  }
})