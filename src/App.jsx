import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState({
    label: "",
    desc: "",
  });

  const handleChange = (e) => {
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    setTodos([...todos, todoItem]);
    console.log(todoItem);
    await invoke("add_todo", { todoItem: todoItem });
  };

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <input
        type="text"
        placeholder="Label"
        onChange={handleChange}
        name="label"
      />
      <input
        type="text"
        placeholder="Desc"
        onChange={handleChange}
        name="desc"
      />
      <button onClick={addItem}>Add Todo</button>

      {todos.map((item, index) => {
        return (
          <div key={index}>
            <p>
              {item.label} : {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
