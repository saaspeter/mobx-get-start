import TodoStore from './TodoStore';
import './App.css';
import TodoList from './components/TodoList';
import { observable } from'mobx';

function App() {
  const store = new TodoStore();

  const initialize = () => {
    store.addTodo("read MobX tutorial");
    store.addTodo("try MobX");
    store.todos[0].completed = true;
    store.todos[1].task = "try MobX in own project";
    store.todos[0].task = "grok MobX tutorial";
    store.todos[0].completed = !store.todos[0].completed;
    store.todos[1].task = "Random todo " + Math.random();
    store.todos.push({ task: "Find a fine cheese", completed: true });
    const peopleStore = observable([
      { name: "Michel" },
      { name: "Me" }
    ]);
    store.todos[0].assignee = peopleStore[0];
    store.todos[1].assignee = peopleStore[1];
    peopleStore[0].name = "Michel Weststrate";
  }
  
  initialize();

  return (
    <div className="App">
      <h3>TODO List</h3>
      <TodoList store={store} />
      <hr />
    </div>
  );
}

export default App;
