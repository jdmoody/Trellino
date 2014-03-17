window.Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  attributes: function () {
    return {
      "data-list-id": this.model.get("id")
    };
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "add", this.removeNewCardView);
    this.listenTo(this.model.cards(), "remove", this.removeCard);

    this.model.cards().each(this.addCard.bind(this));
  },
  
  template: JST["lists/show"],
  
  events: {
    "click button.destroy-list": "destroy",
    "click button#new-card": "newCard",
    "move": "moveList"
  },
  
  render: function () {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);

    this.renderSubviews();
    
    return this;
  },
  
  moveList: function () {
    var board = Trellino.Collections.boards.get(this.model.get("board_id"));
    
    var prevId = this.$el.prev().data("list-id");
    var nextId = this.$el.next().data("list-id");
    
    var prevModel = board.lists().get(prevId);
    var nextModel = board.lists().get(nextId);
    
    var newRank;
    if (prevModel == null) {
      newRank = nextModel.get("rank") - 1;
    } else if (nextModel == null) {
      newRank = prevModel.get("rank") + 1;
    } else {
      newRank = (prevModel.get("rank") + nextModel.get("rank")) / 2;
    }
    
    this.model.save({ rank: newRank });
  },
  
  addCard: function (card) {
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
  },
  
  newCard: function () {
    var cardNewView = new Trellino.Views.CardsNew({
      list: this.model
    });
    
    this.addSubview(".card-new", cardNewView);
    this.renderSubviews();
  },
  
  removeNewCardView: function () {
    this.subviews()[".card-new"] = [];
  }
})