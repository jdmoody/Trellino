window.Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  initialize: function (){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "add", this.removeNewListView);
    this.listenTo(this.model.lists(), "remove", this.removeList);

    this.model.lists().each(this.addList.bind(this));
  },
  
  template: JST["boards/show"],
  
  events: {
    "click #new-list-button": "newList"
  },
  
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    this.$(".lists").sortable({
      floating: true,
      placeholder: "highlight",
      "axis": "x",
      "start": function (event, ui) { ui.item.toggleClass("highlight") },
      "update": function (event, ui) { ui.item.trigger("move") },
      "stop": function (event, ui) { ui.item.toggleClass("highlight") }
    })
    
    this.renderSubviews();

    return this;
  },
  
  addList: function (list) {
    var listsShowView = new Trellino.Views.ListsShow({
      model: list
    });
    
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },
  
  removeList: function (list) {
    var listsShowView = 
    _(this.subviews()[".lists"]).find(function (subview) {
      return subview.model == list;
    });
    
    this.removeSubview(".lists", listsShowView);
  },
  
  newList: function () {
    var listNewView = new Trellino.Views.ListsNew({
      board: this.model
    })
    this.addSubview(".list-new", listNewView);
    this.renderSubviews();
  },
  
  removeNewListView: function () {
    this.subviews()[".list-new"] = [];
  }
})