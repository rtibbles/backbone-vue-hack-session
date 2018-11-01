var Backbone = require('backbone');
var { TodoCollection } = require('./models');
var { TodoListView } = require('./views');


var TodoRouter = Backbone.Router.extend({

  initialize: function() {

    var todoCollection = new TodoCollection();
    var todoListView = new TodoListView({
      collection: todoCollection
    });

  }

});

module.exports = TodoRouter;
