window.Trellino.Views.MembersNew = Backbone.View.extend({
  template: JST["members/new"],
  
  initialize: function (options) {
    this.board = options.board;
  },
  
  events: {
    "submit #new-member": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({
      board: this.board
    });

    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    debugger;
    var memberParams = $(event.currentTarget).serializeJSON()["member"];
    var newMember = new Trellino.Models.User(memberParams);
    
    var view = this;
    newMember.save({}, {
      success: function () {
        view.board.members().add(newMember);
        view.remove();
      }
    });
  }
});