import React, { useState } from 'react';

const TodoList = ({ todoItems, setTodoItems, errorMessage, setErrorMessage }) => {
  const [editInputValue, setEditInputValue] = useState("")

  const handleToggleComplete = (id) => {

    let updatedTodoItems = todoItems.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setTodoItems(updatedTodoItems);
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

  const handleMoveUp = (item) => {
    const index = todoItems.findIndex(todo => todo.id === item.id);
    if (index > 0) {
      const newArray = [...todoItems];
      const arrInd = newArray[index];
      newArray[index] = newArray[index - 1];
      newArray[index - 1] = arrInd;
      setTodoItems(newArray);
    }
    setErrorMessage("")
  }

  const handleMoveDown = (item) => {
    const index = todoItems.findIndex(todo => todo.id === item.id);
    if (index < todoItems.length - 1) {
      const newArray = [...todoItems];
      const arrInd = newArray[index];
      newArray[index] = newArray[index + 1];
      newArray[index + 1] = arrInd;
      setTodoItems(newArray);
    }
    setErrorMessage("")
  }

  const handleEditing = (item, index) => {
    const updatedItems = todoItems.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return { ...todo, editMode: true };
      }
      return { ...todo, editMode: false };
    });
    setTodoItems(updatedItems);

  }


  const handleSaveEditItem = (item) => {
    if (item.name !== "") {
      const updatedItems = todoItems.map((todo, index) => {
        return todo === index ? { ...todo, editMode: true } : { ...todo, editMode: false };
      });

      setTodoItems(updatedItems);
    } else {
      setErrorMessage("The field cannot be empty.");
    }

  }

  const handleCancelEdit = (item) => {
    setErrorMessage("");
    setTodoItems(todoItems.map(todo => {
      if (todo.id === item.id) {
        todo.editMode = false;
      }
      return todo;
    }));
  }

  const handleEditInputChange = (e, item) => {
    setTodoItems(todoItems.map(todo => {
      if (todo.id === item.id) {
        return { ...todo, name: e.target.value };
      } else {
        return todo;
      }
    }));
    setErrorMessage("");
  };


  return (
    <div className="todo-list">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {todoItems.map((item, index) => (
          <li className='list-item' key={item.id} style={{ textDecoration: item.isDone ? 'line-through' : 'none', color: item.isDone ? 'red' : 'black' }}>
            {item.editMode ? (
              <>
                <input type='text' value={item.name} className='list' onChange={(e) => handleEditInputChange(e, item)} />
                <button className='button-save' onClick={() => handleSaveEditItem(item)}>Save</button>
                <button className='button-cancel' onClick={() => handleCancelEdit(item)}>Cancel</button>
              </>
            ) : (
              <>
                <input type='checkbox' checked={item.isChecked} onChange={() => handleItemChecked(item.id)} />
                {item.name}
                <button className='button-isComplete' onClick={() => handleToggleComplete(item.id)}>Complete</button>
                <button className='button-delete' onClick={() => handleEditing(item, index)}>Edit</button>
                <button className='button-up' onClick={() => handleMoveUp(item)}>Up</button>
                <button className='button-down' onClick={() => handleMoveDown(item)}>Down</button>
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