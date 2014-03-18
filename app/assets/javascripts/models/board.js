window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",
  
  lists: function () {
    if(!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }

    return this._lists;
  },
  
  members: function () {
    if(!this._members) {
      this._members = new Trellino.Collections.Users([], {
        board: this
      });
    }
    
    return this._members;
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