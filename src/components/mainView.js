import React, { useState, useEffect } from 'react';

import TodoForm from './toDoForm';
import TodoTable from './todoTable';

const testData = [
  { id: 1, description: "Item 1", done: true },
  { id: 2, description: "Item 2", done: false },
  { id: 3, description: "Item 3", done: false },
]

export default function MainView(props) {

  const [loading, setLoading] = useState(true);
  const [toDoItems, setToDoItems] = useState(testData);
  const [selectedItem, setEditItem] = useState({ id: -1, description: "", done: false });

  const serverUrl = "http://todo-app-server.azurewebsites.net/Todoitem";
  
  useEffect(() => {
    fetch('http://todo-app-server.azurewebsites.net/Todoitem')
      .then(res => res.json())
      .then(
        (result) => {
          setToDoItems(result);
          setLoading(false);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          //setIsLoaded(true);
          //setError(error);
        }
      )
  }, [])

  const CreateRequestOptions = (verb, item) => {
    return {
      method: verb,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }
  }

  const deleteItem = (id) => {

    const requestOptions = CreateRequestOptions('DELETE');

    fetch("http://todo-app-server.azurewebsites.net/Todoitem/" + id, requestOptions)
      .then(() => {
        setToDoItems(toDoItems.filter(item => item.id !== id))
      });
  }

  const checkDoneCallback = (id) => {
    if (loading)
      return;

    let tempItem = toDoItems.filter(item => item.id === id)[0];
    tempItem.done = !tempItem.done;

    const requestOptions = CreateRequestOptions('PUT', tempItem);

    fetch("http://todo-app-server.azurewebsites.net/Todoitem/" + id, requestOptions)
      .then(() => {
        setToDoItems(toDoItems.map(item => item.id === id ? tempItem : item))
      });
  }

  const editItem = (id) => {
    let item = toDoItems.filter(item => item.id === id)[0]
    if (item !== null) {
      setEditItem(item);
    }
  }

  const cancelEdit = () => {
    setEditItem({ id: -1, description: "", done: false });
  }

  const saveEditItem = (item) => {
    if (selectedItem.id === -1)
      createNewIten(item);
    else
      updateIten(item);
  }

  const createNewIten = (item) => {
    const requestOptions = CreateRequestOptions('POST', item);
    fetch("http://todo-app-server.azurewebsites.net/Todoitem", requestOptions)
      .then(response => response.json())
      .then(data => {
        item.id = data.id;
        setToDoItems([...toDoItems, item])
      });
  }

  const updateIten = (item) => {
    const requestOptions = CreateRequestOptions('PUT', item);
    fetch("http://todo-app-server.azurewebsites.net/Todoitem/" + item.id, requestOptions)
      .then(() => {
        setToDoItems(toDoItems.map((element) => {
          return (element.id === item.id) ? item : element;
        }))
      });
  }

  return (
    <div>
      <h1 className="text-center">To Do App</h1>
      <div className="row">
        <div className="col-6">
          <TodoTable
            loading={loading}
            deleteCallback={deleteItem}
            checkDoneCallback={checkDoneCallback}
            editCallback={editItem}
            toDoItems={toDoItems}
          />
        </div>
        <div className="col-6">
          <TodoForm
            editItem={selectedItem}
            createToDoCallback={saveEditItem}
            cancelEditCallback={cancelEdit}
          />
        </div>
      </div>
    </div>
  )
}