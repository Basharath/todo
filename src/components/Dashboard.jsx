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
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
  {
    status: 'Todo',
    text: 'Try to practice boxing everyday',
    date: '21 January, 2020',
  },
];

const ACTION = {
  ADD: 'add',
  DELETE: 'delete',
  EDIT: 'edit',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD:
      return [action.payload, ...state];

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
              <Card key={idx} status={t.status} text={t.text} date={t.date} />
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
