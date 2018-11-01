var Backbone = require('backbone');
var _ = require('underscore');
var TodoTemplate = require('./templates/item.handlebars');
var ListTemplate = require('./templates/list.handlebars');
var StatsTemplate = require('./templates/stats.handlebars');

// View for individual Todo model
var TodoView = Backbone.View.extend({

  tagName: 'li',

  className: 'todo',

  template: TodoTemplate,

  events: {
    'click .todo-toggle': 'toggleTodo',
    'click .todo-remove': 'removeTodo',
    'dblclick .todo-desc': 'openTodo',
    'keypress .todo-edit': 'editTodo'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'remove', this.remove);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  toggleTodo: function(e) {
    this.model.toggle();
  },

  removeTodo: function() {
    this.model.destroy();
  },

  openTodo: function(e) {
    $(e.target).hide();
    this.$('.todo-edit').show();
  },

  editTodo: function(e) {

    // ENTER key pressed, so save the modified todo
    if (e.charCode === 13) {
      var description = $(e.target).val().trim();
      this.model.edit(description);
    }
  }

});

// View for stats
var StatsView = Backbone.View.extend({

  template: StatsTemplate,

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'remove', this.render);
  },

  render: function() {

    var statsData = {
      totalTodos: this.collection.getTotal(),
      completedTodos: this.collection.getNumCompleted(),
      incompleteTodos: this.collection.getNumIncomplete()
    };

    this.$el.html(this.template(statsData));

    return this;
  }

});

// View for TodoList collection
var TodoListView = Backbone.View.extend({

  className: 'todo-list',

  template: ListTemplate,

  events: {
    'keypress #todo-create': 'create',
    'click #todo-toggle-all': 'toggleAll',
    'click #todo-remove-all': 'removeAll'
  },

  initialize: function() {

    _.bindAll(this, 'addOne');

    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'change', this.toggleControls);
    this.listenTo(this.collection, 'remove', this.toggleControls);
  },

  render: function() {
    this.$el.html(this.template());
    this.$editor = this.$('#todo-create');
    this.$todoList = this.$('#todo-list');
    this.$footer = this.$('.todo-footer');
    this.addAll();
    this.statsView = new StatsView({
      el: this.$footer,
      collection: this.collection
    });

    this.statsView.render();

    return this;
  },

  addOne: function(todoModel) {
    var todoView = new TodoView({model: todoModel});
    this.$todoList.append(todoView.render().el);
  },

  addAll: function() {
    this.collection.each(this.addOne);
  },

  create: function(e) {

    // ENTER key pressed, so save the description
    if (e.keyCode === 13) {
      var desc = this.$editor.val().trim();
      this.collection.createTodo(desc);
      this.$editor.val('');
    }

  },

  toggleAll: function(e) {

    if (this.collection.getTotal() > 0) {
      this.collection.toggleAll();
    }
  },

  toggleControls: function() {
    var numCompleted = this.collection.getNumCompleted();
    var isCompleted = numCompleted > 0;
    var isAllCompleted = isCompleted && this.collection.getTotal() === numCompleted;
    var toggleMethod = isCompleted ? 'show' : 'hide';

    this.$('#todo-remove-all')[toggleMethod]();
    this.$('#todo-toggle-all').toggleClass('on', isAllCompleted);
  },

  removeAll: function() {
    this.collection.removeAllCompleted();
  }

});

module.exports = {
  TodoView,
  TodoListView,
  StatsView,
};
