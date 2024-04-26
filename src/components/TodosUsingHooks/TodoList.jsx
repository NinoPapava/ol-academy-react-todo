import React, { useState } from 'react';

const TodoList = ({ todoItems, setTodoItems, errorMessage, setErrorMessage }) => {
  
  const [editInputValue, setEditInputValue] = useState("")


  const handleToggleComplete = (id) => {
    setTodoItems(todoItems.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ));
    setErrorMessage("");
  }


  const handleItemChecked = (id) => {
    setTodoItems(todoItems.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ));
    setErrorMessage("");
  }

  const handleDelete = ({ id }) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
    setErrorMessage("")
  }


  const handleMove = (item, direction) => {
    const index = todoItems.findIndex(todo => todo.id === item.id);
    if ((direction === "up" && index > 0) ||
        (direction === "down" && index < todoItems.length - 1)) {
      const directionModeForUpDown = direction === "up" ? -1 : 1;
      const newArray = [...todoItems];
      const arrIndex = newArray[index];
      newArray[index] = newArray[index + directionModeForUpDown];
      newArray[index + directionModeForUpDown] = arrIndex;
      setTodoItems(newArray);
    }
    setErrorMessage("");
  }


  const handleEditing = (item, index) => {
    setTodoItems(todoItems.map((todo, todoIndex) => 
    ({ ...todo, editMode: todoIndex === index  })
    ));
    setEditInputValue(item.name)
    setErrorMessage("")
  }


  const handleSaveEditItem = (item) => {
    const isExistItem = todoItems.find(item => item.name === editInputValue)
    if (item.name === editInputValue) {
      handleCancelEdit(item)
    }
    if (editInputValue === "") {
      setErrorMessage("The field cannot be empty.")
    }
    if (isExistItem && item.name !== editInputValue) {
      setErrorMessage("Account with this name already exists.")
    }
    else {
      setTodoItems(todoItems.map((todo) =>
        todo.id === item.id ? { ...todo, name: editInputValue, editMode: false } : { ...todo, editMode: false }
      ))
      setEditInputValue("")
      setErrorMessage("")
    }
  }


  const handleCancelEdit = (item) => {
    setTodoItems(todoItems.map(todo => 
      todo.id === item.id ? { ...todo, editMode: false } : todo
    ));
  }

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  };


  return (
    <div className="todo-list">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {todoItems.map((item, index) => (
          <li className='list-item' key={item.id} style={{ textDecoration: item.isDone ? 'line-through' : 'none', color: item.isDone ? 'red' : 'black' }}>
            {item.editMode ? (
              <>
                <input type='text' value={editInputValue} className='list' onChange={handleEditInputChange} />
                <button className='button-save' onClick={() => handleSaveEditItem(item)}>Save</button>
                <button className='button-cancel' onClick={() => handleCancelEdit(item)}>Cancel</button>
              </>
            ) : (
              <>
                <input type='checkbox' checked={item.isChecked} onChange={() => handleItemChecked(item.id)} />
                {item.name}
                <button className='button-isComplete' onClick={() => handleToggleComplete(item.id)}>Complete</button>
                <button className='button-delete' onClick={() => handleEditing(item, index)}>Edit</button>
                <button className='button-up' onClick={() => handleMove(item, "up")}>Up</button>
                <button className='button-down' onClick={() => handleMove(item, "down")}>Down</button>
                <button className='button-edit' onClick={() => handleDelete(item)}>Delete</button>
              </>
            )}
          </li>
        )
        )}
      </ul>
    </div>
  );
}
export { TodoList };