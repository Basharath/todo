import React, { useState } from 'react';
import Card from './Card';
import AddTodo from './AddTodo';
import Sidebar from './Sidebar';

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
];

export default function Dashboard() {
  const [todoList, setTodoList] = useState(list);
  const [show, setShow] = useState(false);

  const handleAddTodo = (text, date) => {
    const obj = {
      status: 'Todo',
      text,
      date,
    };

    const newList = [obj, ...todoList];
    setTodoList(newList);
  };

  const handleShow = () => {
    setShow(false);
  };

  return (
    <div className="dashboard">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <div className="topbar">
          <button className="btn btn-add-todo" onClick={() => setShow(true)}>
            <i className="fas fa-plus"></i> Add Todo
          </button>
        </div>

        <div className="todos">
          {todoList.map((t, idx) => (
            <Card key={idx} status={t.status} text={t.text} date={t.date} />
          ))}
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
