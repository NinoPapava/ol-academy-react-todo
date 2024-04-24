import { v4 as uuidv4 } from 'uuid';


const AddTodo = ({ inputValue, setInputValue, todoItems, setTodoItems, errorMessage, setErrorMessage}) => {

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmitTodo = () => {

    if (inputValue.trim() === "") {
      setErrorMessage("The field cannot be empty.");
      return;
    }
    const existingTask = todoItems.filter(item => item.name === inputValue);
    if (existingTask.length > 0) {
      setErrorMessage("Account with this name already exists.");
      return;
    }
    setTodoItems([
      ...todoItems,
      { id: uuidv4(), name: inputValue, isChecked: false, editMode: false },
    ]);
    setInputValue("");
    setErrorMessage("");
  }



  return (
    <div className='add-todo'>
      <input
        type='text'
        placeholder='Enter Item'
        className='item-input'
        value={inputValue}
        required
        onChange={handleInputChange}
      />
      <button onClick={handleSubmitTodo}>Add</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
export { AddTodo };


