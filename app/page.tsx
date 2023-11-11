"use client";

import { useRef, useState } from "react";
import { CustomButton } from "./Component/CustomButton";
import { warningPopUp } from "./Component/popUp";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

const initialTodos: Todo[] = [
  { id: 0, title: "Buy a new gaming laptop", done: false },
  { id: 1, title: "Create video for youtube", done: false },
  { id: 2, title: "Create a new portfolio site", done: false },
  { id: 3, title: "Prepare for the interview", done: false },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [value, setValue] = useState<string>("");
  const [assertPopUp, setAssertPopUp] = useState<boolean>(false);

  const lastId = useRef<number>(3);

  const pendingTodos: number = todos.filter((todo) => todo.done == false).length;
  const pendingMessage: string =
    todos.length == 0
      ? "You have no tasks!"
      : pendingTodos == 0
      ? "You did all tasks!"
      : `You have ${pendingTodos} pending tasks!`;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {assertPopUp
        ? warningPopUp(
            () => {
              setTodos([]);
            },
            () => {
              setAssertPopUp(false);
            },
          )
        : null}
      <div
        className={`flex flex-col gap-4 w-full max-w-xl p-6 rounded-sm bg-white shadow-[0px_10px_15px_rgba(0,0,0,0.1)] max-h-[90%] ${
          assertPopUp ? "blur-[1px]" : null
        }`}
      >
        <h1 className="text-2xl font-bold">Todo App</h1>

        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            disabled={assertPopUp}
            placeholder="Add your new todo"
            className="flex-1 w-full p-3 text-gray-800 rounded-sm border border-solid border-gray-300 focus:outline-none focus:border-purple-800 focus:border-2"
          />
          <button
            className="py-2 px-6 text-3xl text-white bg-purple-500 rounded-sm disabled:opacity-50 hover:opacity-80 active:opacity-100"
            disabled={value.trim() === ""}
            onClick={() => {
              const newTodo = { id: ++lastId.current, title: value, done: false };
              setTodos([newTodo, ...todos]);
              setValue("");
            }}
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-auto">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              done={todo.done}
              assertPopUp={assertPopUp}
              onDone={() => {
                const doneTodos = { ...todo, done: !todo.done };
                setTodos(
                  doneTodos.done
                    ? [...todos.filter((t) => t.id !== todo.id), doneTodos]
                    : [doneTodos, ...todos.filter((t) => t.id !== todo.id)],
                );
              }}
              onDelete={() => {
                setTodos(todos.filter((t) => t.id !== todo.id));
              }}
            />
          ))}
        </div>

        <div className="mt-6 px-5 flex justify-between items-center bg-green-200 py-3 rounded-lg">
          <p></p>
          <p className="text-xl font-semibold text-sky-800">{pendingMessage}</p>
          <button
            className="bg-purple-500 rounded-md text-white p-2 disabled:opacity-60 hover:opacity-80 active:opacity-100"
            disabled={todos.length === 0 || assertPopUp}
            onClick={() => {
              setAssertPopUp(true);
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

type TodoItemProps = {
  title: string;
  done: boolean;
  assertPopUp: boolean;
  onDone: () => void;
  onDelete: () => void;
};

function TodoItem({ title, done, assertPopUp, onDone, onDelete }: TodoItemProps) {
  const Done = done ? "Undo" : "Done";
  const icon = done ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      className="w-6 h-6 min-w-fit min-h-fit mr-2 stroke-green-600 object-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ) : null;

  return (
    <div className="flex justify-between items-center p-3 bg-gray-200 text-gray-800 rounded-sm min-w-fit">
      <div className="flex items-center">
        {icon}
        <p className="break-all">{title}</p>
      </div>
      <div className="min-w-fit">
        <CustomButton onClick={onDone} text={Done} color="bg-blue-500" disabled={assertPopUp} />
        <CustomButton onClick={onDelete} text="Delete" color="bg-red-500" disabled={assertPopUp} />
      </div>
    </div>
  );
}
