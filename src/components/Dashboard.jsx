import React, { useState, useReducer } from 'react';
import Card from './Card';
import AddTodo from './AddTodo';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

import { getFormattedDate } from './../util';

const list = [
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 1,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: true,
    id: 2,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 3,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 4,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 5,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 6,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 7,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 8,
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
    favorite: false,
    id: 9,
  },
];

export const ACTION = {
  ADD: 'add',
  DELETE: 'delete',
  EDIT: 'edit',
  FAVORITE: 'favorite',
  UPDATE: 'update',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD:
      return [action.payload, ...state];

    case ACTION.UPDATE:
      return [...action.payload];

    default:
      return state;
  }
};

export default function Dashboard() {
  const [todoList, dispatch] = useReducer(reducer, []);
  const [show, setShow] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ text: '', id: '' });

  const now = new Date();
  const { short } = getFormattedDate(now);

  const handleAddTodo = (text, id = '') => {
    if (id) {
      const index = todoList.findIndex((i) => i.id === id);
      const todo = todoList[index];
      todo.text = text;
      const updated = [...todoList];
      updated[index] = todo;
      dispatch({ type: ACTION.UPDATE, payload: updated });
      return;
    }

    const obj = {
      text,
      status: 'Todo',
      date: short,
      favorite: false,
      id: new Date().getTime(),
    };

    dispatch({ type: ACTION.ADD, payload: obj });
  };

  const handleShow = (text = '', id = '') => {
    if (id) setCurrentTodo({ text, id });
    else setCurrentTodo({ id: '' });
    setShow(!show);
  };

  const handleDelete = (id) => {
    const filtered = todoList.filter((i) => i.id !== id);
    dispatch({ type: ACTION.UPDATE, payload: filtered });
  };

  return (
    <div className="dashboard">
      <aside>
        <Sidebar />
      </aside>

      <main>
        <SearchBar handleShow={handleShow} />
        <div className="todos-container">
          <div className="todos">
            {todoList.map((t, idx) => (
              <Card
                key={idx}
                todoList={todoList}
                todo={t}
                dispatch={dispatch}
                handleEdit={handleShow}
              />
            ))}
          </div>
        </div>
      </main>

      <div
        className={'todomodal' + (show ? ' show' : '')}
        onClick={() => setShow(false)}
      >
        <AddTodo
          handleShow={handleShow}
          handleAddTodo={handleAddTodo}
          currentTodo={currentTodo}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
