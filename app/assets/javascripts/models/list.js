window.Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function () {
    var boardId = this.get("board_id");
    return "/boards/" + boardId + "/lists"
  },
  
  cards: function () {
    if(!this._cards) {
      this._cards = new Trellino.Collections.Cards([], {
        list: this
      });
    }
    
    return this._cards;
  }, 
  
  toJSON: function () {
    var clonedAttrs = _.clone(this.attributes);
    delete clonedAttrs.id;
    delete clonedAttrs.updated_at;
    delete clonedAttrs.created_at;
    return clonedAttrs;
  }
});