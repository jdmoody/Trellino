window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",
  
  lists: function () {
    if(!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this,
        parse: true
      });
    }

    return this._lists;
  },
  
  parse: function (response) {
    if (response.lists) {
      this.lists().set(response.lists);
      this.lists().models.forEach(function (list, idx) {
        list.cards().set(response.lists[idx].cards);
      });
      delete response.lists;
    }
    
    return response;
  }
});