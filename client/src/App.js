import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    fetch("http://localhost:3001/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => {
        setError("Failed to fetch todos");
        console.error("Error fetching todos:", err);
      });
  }, []);

  // Handle adding a new todo
  const handleAdd = async () => {
    if (input.trim() === "") return; // Don't add empty todos

    const newTodo = { id: Date.now(), text: input };
    setLoading(true);
    setError(""); // Reset error state

    try {
      // Send request to add todo to the server
      await fetch("http://localhost:3001/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      // Optimistic UI update: add todo to the list immediately
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (error) {
      // Handle error if the request fails
      setError("Failed to add todo. Please try again later.");
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      {/* Input for adding new todos */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>

      {/* Show error message if there's an issue */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
