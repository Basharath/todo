import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase/init';
import { getFormattedDate } from './../util';

import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import AddTodo from './AddTodo';
import Card from './Card';
import Login from './Login';

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [domTodoList, setDomTodoList] = useState(todoList);
  const [show, setShow] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ text: '', id: '' });
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);
  const todosRef = useRef(null);

  const userDb = loggedIn ? db.collection('users').doc(loggedIn) : '';

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

  const fetchData = (userId) => {
    db.collection('users')
      .doc(userId)
      .collection('todos')
      .orderBy('time', 'desc')
      .onSnapshot(async (querySnapshot) => {
        const data = await querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date,
          text: doc.data().text,
          status: doc.data().status,
          favorite: doc.data().favorite,
        }));
        setTodoList(data);
      });
  };

  useEffect(() => {
    if (!searchText) {
      handleDomTodoList(todoList);
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!loggedIn) {
          const userId = user.uid.toString();
          setLoggedIn(userId);
          fetchData(userId);
          handleDomTodoList(todoList);
        }
      } else {
        setLoggedIn(null);
      }
    });
  }, [searchText, todoList, loggedIn]);

  const handleAddTodo = (text, id = '') => {
    if (id) {
      const index = todoList.findIndex((i) => i.id === id);
      const todo = todoList[index];
      todo.text = text;
      const updated = [...todoList];
      updated[index] = todo;
      setTodoList(updated);
      userDb.collection('todos').doc(id).update({
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

    setTodoList([obj, ...todoList]);
    todosRef.current.scrollTo({
      top: 0,
    });

    userDb.collection('todos').add({
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
    setTodoList(filtered);
    userDb.collection('todos').doc(id).delete();
  };

  return (
    <div className="dashboard">
      <aside>
        <Sidebar
          todoList={todoList}
          handleDomTodoList={handleDomTodoList}
          loggedIn={loggedIn}
        />
      </aside>

      <main>
        {!loggedIn ? (
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
                      onUpdate={setTodoList}
                      handleEdit={handleShow}
                      user={loggedIn}
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
