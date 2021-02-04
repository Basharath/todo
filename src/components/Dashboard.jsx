import React, { useState, useEffect, useReducer, useRef } from 'react';
import { db } from '../firebase';
import Card from './Card';
import AddTodo from './AddTodo';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

import { getFormattedDate } from './../util';
import Login from './Login';

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
  const [todoList, dispatch] = useReducer(reducer, '');
  const [domTodoList, setDomTodoList] = useState(todoList);
  const [show, setShow] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ text: '', id: '' });
  const [searchText, setSearchText] = useState('');
  const [login, setLogin] = useState(false);
  const inputRef = useRef(null);
  const todosRef = useRef(null);
  const [isMount, setIsMount] = useState(false);

  const now = new Date();
  const { short } = getFormattedDate(now);

  const handleDomTodoList = (list) => {
    setDomTodoList(list);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = todoList.filter((i) =>
      i.text.toLowerCase().includes(searchText.toLowerCase())
    );
    handleDomTodoList(filtered);
  };

  const dataInit = () => {
    db.collection('todos')
      .orderBy('time', 'desc')
      .onSnapshot(async (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date,
          text: doc.data().text,
          status: doc.data().status,
          favorite: doc.data().favorite,
        }));
        dispatch({ type: ACTION.UPDATE, payload: data });
        setDomTodoList(data);
      });
  };

  useEffect(() => {
    if (!isMount) {
      dataInit();
      setIsMount(true);
    }

    if (!searchText) {
      handleDomTodoList(todoList);
    }
  }, [searchText, isMount, todoList]);

  const handleAddTodo = (text, id = '') => {
    if (id) {
      const index = todoList.findIndex((i) => i.id === id);
      const todo = todoList[index];
      todo.text = text;
      const updated = [...todoList];
      updated[index] = todo;
      dispatch({ type: ACTION.UPDATE, payload: updated });
      db.collection('todos').doc(id).update({
        text,
      });

      return;
    }

    const obj = {
      text,
      status: 'Todo',
      date: short,
      favorite: false,
      time: new Date().getTime(),
    };

    dispatch({ type: ACTION.ADD, payload: obj });
    todosRef.current.scrollTo({
      top: 0,
    });

    db.collection('todos').add({
      ...obj,
    });
  };

  const handleShow = (text = '', id = '') => {
    if (id) setCurrentTodo({ text, id });
    else setCurrentTodo({ id: '' });
    inputRef.current.focus();
    setShow(!show);
  };

  const handleDelete = (id) => {
    const filtered = todoList.filter((i) => i.id !== id);
    dispatch({ type: ACTION.UPDATE, payload: filtered });
    db.collection('todos').doc(id).delete();
  };

  return (
    <div className="dashboard">
      <aside>
        <Sidebar
          todoList={todoList}
          handleDomTodoList={handleDomTodoList}
          onLogin={setLogin}
        />
      </aside>

      <main>
        {login ? (
          <Login />
        ) : (
          <>
            <SearchBar
              handleShow={handleShow}
              handleSearch={handleSearch}
              onSearch={setSearchText}
            />
            <div className="todos-container" ref={todosRef}>
              <div className="todos">
                {domTodoList.length > 0 ? (
                  domTodoList.map((t, idx) => (
                    <Card
                      key={idx}
                      todoList={todoList}
                      todo={t}
                      dispatch={dispatch}
                      handleEdit={handleShow}
                    />
                  ))
                ) : !searchText ? (
                  <div className="empty">No todos yet here</div>
                ) : (
                  <div className="empty">No matching todos found</div>
                )}
              </div>
            </div>
          </>
        )}
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
          inputRef={inputRef}
          show={show}
        />
      </div>
    </div>
  );
}
