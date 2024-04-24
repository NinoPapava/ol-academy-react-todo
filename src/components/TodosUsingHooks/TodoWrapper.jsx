import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';


const TodoWrapper = () => {

  const [todoItems, setTodoItems] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleDeleteCompleteItems = () => {
    setTodoItems(todoItems.filter(item => !item.isDone));
  }

  const handleDeleteCheckedItems = () => {
    setTodoItems(todoItems.filter(item => !item.isChecked));
  }

  const handleDeleteAll = () => {
    setTodoItems([])
  }

  return (
    <div className="todo-wrapper">
    <h1>Ol Academy Todo List</h1>
      <AddTodo
        inputValue={inputValue}
        setInputValue={setInputValue}
        todoItems={todoItems}
        setTodoItems={setTodoItems}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <TodoList
        todoItems={todoItems}
        setTodoItems={setTodoItems}
        setErrorMessage={setErrorMessage}
      />
      <button className='button-deleteComplete' onClick={handleDeleteCompleteItems} >Delete Complete Items</button>
      <button className='button-deleteChecked' onClick={handleDeleteCheckedItems} >Delete Checked Items</button>
      <button className='button-deleteAll' onClick={handleDeleteAll} >Delete All </button>
    </div>
  );
}

export { TodoWrapper };

