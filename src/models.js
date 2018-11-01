var Backbone = require('backbone');
var _ = require('underscore');

// Model
var TodoModel = Backbone.Model.extend({

  defaults: {
    description: '',
    completed: false
  },

  toggle: function() {
    var isCompleted = !this.get('completed');
    this.set({completed: isCompleted});

    return isCompleted;
  },

  edit: function(description) {
    if (_.isString(description) && description.length > 0) {
      this.set({description: description});
    }
  }

});

// Collection
var TodoCollection = Backbone.Collection.extend({

  model: TodoModel,

  getTotal: function() {
    return this.length;
  },

  getCompleted: function() {
    return this.where({completed: true});
  },

  getNumCompleted: function() {
    return this.getCompleted().length;
  },

  getIncomplete: function() {
    return this.where({completed: false});
  },

  getNumIncomplete: function() {
    return this.getIncomplete().length;
  },

  createTodo: function(description) {
    if (_.isString(description) && description.length > 0) {
      this.add(new this.model({description: description}));
    }
  },

  toggleAll: function() {
    var incompleteTodos = this.where({completed: false});

    // Set all incomplete todos to 'completed'
    if (incompleteTodos.length > 0) {
     _(incompleteTodos).each(function(todoModel) {
       todoModel.set({completed: true});
      }, this);
    }

    // All todos completed, so unset the completed status for all
    else {
       this.each(function(todoModel) {
       todoModel.set({completed: false});
      }, this);
    }
  },

  removeAllCompleted: function() {
    this.remove(this.getCompleted());
  }

});

module.exports = {
  TodoModel,
  TodoCollection,
}
