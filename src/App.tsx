import React, { useCallback, useEffect, useReducer, useRef } from "react";

interface Todo {
  id: number;
  text: string;
}
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

const getLocalData = () => {
  const getData = localStorage.getItem("data");
  if (getData) {
    return JSON.parse(getData);
  } else {
    return [];
  }
};

function App() {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, getLocalData());

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  const onRemoveTodo = (id: number) => {
    dispatch({
      type: "REMOVE",
      id: id,
    });
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-gray-200 h-screen flex justify-center">
      <div className="mt-5">
        <input
          className="px-2 py-1 border-2 border-gray-400 focus:border-blue-600 outline-none rounded-md"
          placeholder="Enter user name"
          type="text"
          ref={newTodoRef}
        />
        <button
          className="ml-1 px-3 py-1 bg-gray-400 hover:bg-gray-500 rounded-md uppercase font-semibold text-sm hover:text-gray-300"
          onClick={onAddTodo}
        >
          Add
        </button>
        <div className="mt-10">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="mt-5 p-2 rounded-lg shadow-md bg-white flex justify-between"
            >
              <p className="text-lg font-semibold text-gray-500">{todo.text}</p>
              <button
                className="ml-3 px-3 py-1 bg-gray-400 hover:bg-gray-500 rounded-md uppercase font-semibold text-sm hover:text-gray-300"
                onClick={() => onRemoveTodo(todo.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
