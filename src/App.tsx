import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

interface Todo {
  id: number;
  text: string;
}
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [users, setUsers] = useState<Todo[]>([]);
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
  }, []);

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
    const getData = JSON.parse(localStorage.getItem("data") || "");
    console.log(getData);
    setUsers(getData);
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
          {users.map((user) => (
            <div
              key={user.id}
              className="mt-5 p-2 rounded-lg shadow-md bg-white flex justify-between"
            >
              <p className="text-lg font-semibold text-gray-500">{user.text}</p>
              <button
                className="ml-3 px-3 py-1 bg-gray-400 hover:bg-gray-500 rounded-md uppercase font-semibold text-sm hover:text-gray-300"
                onClick={() => onRemoveTodo(user.id)}
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
