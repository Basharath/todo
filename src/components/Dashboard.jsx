import React, { useState, useReducer } from 'react';
import Card from './Card';
import AddTodo from './AddTodo';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

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
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD:
      return [action.payload, ...state];

    case ACTION.FAVORITE:
      return [...action.payload];

    default:
      return state;
  }
};

export default function Dashboard() {
  const [todoList, dispatch] = useReducer(reducer, list);
  const [show, setShow] = useState(false);

  const handleAddTodo = (text, date) => {
    const obj = {
      status: 'Todo',
      text,
      date,
      favorite: false,
      id: new Date().getTime(),
    };

    dispatch({ type: ACTION.ADD, payload: obj });
  };

  const handleShow = () => {
    setShow(!show);
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
              />
            ))}
          </div>
        </div>
      </main>

      <div
        className={'todomodal' + (show ? ' show' : '')}
        onClick={() => setShow(false)}
      >
        <AddTodo handleShow={handleShow} handleAddTodo={handleAddTodo} />
      </div>
    </div>
  );
}
