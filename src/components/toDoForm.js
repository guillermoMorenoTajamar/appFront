import React, { useState, useEffect } from 'react';


export default function TodoForm(props) {
  const [editItem, setToDoItem] = useState(props.editItem);

  useEffect(() => {
    setToDoItem(props.editItem);
  }, [props])

  const clearForm = () => {
    props.cancelEditCallback();
  }

  const drawForm = () => {
    return (
      <div className="card">
        <div className="card-header text-center">
          {editItem.id === -1 ? "New" : "Edit" } To Do
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Descripcion</label>
              <input
                name="description"
                className="form-control"
                value={editItem.description}
                onChange={(event) => {
                  setToDoItem({ ...editItem, description: event.target.value })
                }}
              />
            </div>
            <div className="form-check">
              <input
                name="done"
                className="form-check-input"
                type="checkbox"
                checked={editItem.done}
                onChange={(event) => {
                  setToDoItem({ ...editItem, done: !editItem.done })
                }}
              />
              <label>Done</label>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                props.createToDoCallback({
                  id: editItem.id,
                  description: editItem.description,
                  done: editItem.done
                });
              }}
            >
             {editItem.id === -1 ? "Create" : "Save" }
            </button>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => { clearForm() }}
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    )
  }

  return drawForm();
}