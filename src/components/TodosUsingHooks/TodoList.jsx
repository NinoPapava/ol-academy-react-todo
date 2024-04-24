import React from 'react';

const TodoList = ({ todoItems, setTodoItems, errorMessage, setErrorMessage }) => {

  const handleToggleComplete = (id) => {
    setErrorMessage("");
    let updatedTodoItems = todoItems.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setTodoItems(updatedTodoItems);
  }

  const handleItemChecked = (id) => {
    setErrorMessage("");
    setTodoItems(todoItems.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ));
  }

  const handleDelete = ({ id }) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
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
  }

  const handleEditing = (item) => {
    setErrorMessage("");
    setTodoItems(todoItems.map(todo => {
      if (todo.id === item.id) {
        return { ...todo, editMode: !todo.editMode };
      } else {
        return todo;
      }
    }));
  }
  const handleSaveEditItem = (item) => {
    const trimmedValue = item.name.trim();

    if (trimmedValue === "") {
      setErrorMessage("empty field.");
      return;

    } else if (todoItems.some(todo => todo.name !== trimmedValue)) {
      setErrorMessage("It's the same name.");
      return;

    } else {
      setTodoItems([{ ...item, ...todoItems, name: trimmedValue, editMode: false }]);
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
      {todoItems.map((item) => (
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
              <button className='button-delete' onClick={() => handleEditing(item)}>Edit</button>
              <button className='button-up' onClick={() => handleMoveUp(item)}>Up</button>
              <button className='button-down' onClick={() => handleMoveDown(item)}>Down</button>
              <button className='button-edit' onClick={() => handleDelete(item)}>Delete</button>
            </>
          )}
        </li>
      )
      )}
    </div>
  );
}
export { TodoList };
