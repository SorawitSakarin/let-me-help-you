'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (e) {
        console.error('Failed to parse todos', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Todo List</h1>
        <Link href="/" className="nes-btn text-xs">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered">
        <h2 className="title">Manage Tasks</h2>

        <form onSubmit={addTodo} className="flex gap-4 mb-6">
          <input
            type="text"
            className="nes-input w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit" className="nes-btn is-primary">
            Add
          </button>
        </form>

        <div className="flex flex-col gap-4 text-left">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between p-4 nes-container is-rounded">
                <label className="flex items-center gap-4 cursor-pointer m-0 w-full overflow-hidden">
                  <input
                    type="checkbox"
                    className="nes-checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={`truncate ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="nes-btn is-error text-xs ml-4"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
