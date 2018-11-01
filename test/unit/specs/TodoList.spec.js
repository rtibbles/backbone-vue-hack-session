var { TodoListView } = require('@/views');
var { TodoCollection } = require('@/models');

describe('TodoListView render method', () => {
  it('should render an empty list when empty', () => {
    var todoCollection = new TodoCollection();
    var todoListView = new TodoListView({ collection: todoCollection });
    todoListView.render();
    var html = todoListView.$el[0].outerHTML;
    expect(html).toMatchSnapshot();
  });
  it('should render a list when not empty', () => {
    var todoCollection = new TodoCollection([
      {
        completed: true,
        description: 'A completed task',
      },
      {
        completed: false,
        description: 'An incompete task',
      }
    ]);
    var todoListView = new TodoListView({ collection: todoCollection });
    todoListView.render();
    var html = todoListView.$el[0].outerHTML;
    expect(html).toMatchSnapshot();
  });
});
