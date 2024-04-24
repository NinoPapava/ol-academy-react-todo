import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';


const TodoWrapper = () => {

  const [todoItems, setTodoItems] = useState([])
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="todo-wrapper">
    <h1>Ol Academy Todo List</h1>
      <AddTodo
        inputValue={inputValue}
        setInputValue={setInputValue}
        todoItems={todoItems}
        setTodoItems={setTodoItems}
      />
      <TodoList
        todoItems={todoItems}
        setTodoItems={setTodoItems}
      />
    </div>
  );
}

export { TodoWrapper };

