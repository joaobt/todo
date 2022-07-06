
import "./App.css";

import { useState, useEffect } from 'react';
import { BsTrash, BsBooKmarKChecK, BsBooKmarKChecKFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  //loads todos on page lod
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);
      setTodos(res);
    };

    loadData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => [...prevState, todos]);


    setTitle("");
    setTime("");
  };

  if (loading) {
    return <p>loading...</p>
  }

  return (

    <div className="App">
      <div className="todo-header">
        <h1>React todo</h1>
      </div>

      <div className="form-todo">

        <h4>Insira a sua próxima tarefa:</h4>

        <form onSubmit={handleSubmit}>

          <div className="form-control">

            <label htmlFor="title">o que você vai fazer?</label>
            <input
              type="text"
              name="title"
              placeholder="Titulo da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />

          </div>

          <div className="form-control">

            <label htmlFor="time">Duração:</label>
            <input
              type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>

      <div className="List-todo">
        <h4>Lista de Tarefas:</h4>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className="todo" Key={todo.id}>

            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className="actions">
              <span>
                {!todo.done ? <BsBooKmarKChecK /> : <BsBooKmarKChecKFill />}
              </span>
              <BsTrash />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;





