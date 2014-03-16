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
  }
  // 
  // parse: function (response) {
  //   debugger
  //   if (response.cards) {
  //     this.cards().set(response.cards);
  //     delete response.cards;
  //   }
  //   
  //   return response;
  // }
});