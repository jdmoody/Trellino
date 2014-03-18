window.Trellino.Views.CardsShow = Backbone.View.extend({
  attributes: function () {
    return {
      "data-card-id": this.model.get("id")
    };
  },
  
  template: JST["cards/show"],
  
  events: {
    "mouseenter li.card": "toggleDestroyButton",
    "mouseleave li.card": "toggleDestroyButton",
    "click button.destroy-card": "destroy",
    "move-card": "moveCard"
  },
  
  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  moveCard: function () {
    var newListId = this.$el.closest(".list-id-div").data("list-id");
    var newList = Trellino.Collections.boards.models[0]
                  .lists().get(newListId);

    var prevId = this.$el.prev().data("card-id");
    var nextId = this.$el.next().data("card-id");
    
    var prevModel = newList.cards().get(prevId);
    var nextModel = newList.cards().get(nextId);
    
    var newRank;
    if (prevModel == null) {
      newRank = nextModel.get("rank") - 1;
    } else if (nextModel == null) {
      newRank = prevModel.get("rank") + 1;
    } else if (nextModel == null && prevModel == null) {
      newRank = 1;
    } else {
      newRank = (prevModel.get("rank") + nextModel.get("rank")) / 2;
    }

    this.model.save({
      rank: newRank,
      list_id: newListId
    });
  },
  
  toggleDestroyButton: function () {
    this.$('.destroy-card').toggleClass("hidden-button");
  },
  
  destroy: function () {
    this.model.destroy();
  }
});