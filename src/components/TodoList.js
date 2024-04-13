import { observer } from "mobx-react-lite";
import { action } from'mobx';
import React from "react";

const TodoList = observer(({store}) => {
  const onNewTodo = () => {
    store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }

  const loadTodo = () => {
    store.pendingRequests++;
    setTimeout(action(() => {
      store.addTodo('Random Todo ' + Math.random());
      store.pendingRequests--;
    }), 2000);
  }

  return (
    <div style={{width: "50%", border: "solid 1px gray", padding: "10px", textAlign: "center", display: "flex", justifyContent: "center", margin: "0 auto"}}>
    <div>
      { store.report }
      <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
      </ul>
      { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
      <button onClick={ onNewTodo }>New Todo</button>
      <small> (double-click a todo to edit)</small>
    </div>
    <div style={{padding: "10px"}}>
      <button onClick={ loadTodo }>Load TODO</button>
    </div>
    </div>
  );
})

const TodoView = observer(({todo}) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  }

  const onRename = () => {
    todo.task = prompt('Task name', todo.task) || todo.task;
  }

  return (
    <li onDoubleClick={ onRename } style={{ textAlign: "left" }}>
      <input
        type='checkbox'
        checked={ todo.completed }
        onChange={ onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
        ? <small>{ todo.assignee.name }</small>
        : null
      }
      
    </li>
  );
})
  
export default TodoList;