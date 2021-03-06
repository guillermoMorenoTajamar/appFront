import React, { useState, useEffect } from 'react';


export default function TodoForm(props) {
  const [selectedItem, setToDoItem] = useState(props.selectedItem);

  useEffect(() => {
    setToDoItem(props.selectedItem);
  }, [props])

  const clearForm = () => {
    props.cancelEditCallback();
  }

  const drawForm = () => {
    return (
      <div className="card m-1 hidden=true">
        <div className="card-header text-center">
          {selectedItem.id === -1 ? "New" : "Edit" } To Do
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Descripcion</label>
              <input
                name="description"
                className="form-control"
                value={selectedItem.description}
                onChange={(event) => {
                  setToDoItem({ ...selectedItem, description: event.target.value })
                }}
              />
            </div>
            <div className="form-check">
              <input
                name="done"
                className="form-check-input"
                type="checkbox"
                checked={selectedItem.done}
                onChange={(event) => {
                  setToDoItem({ ...selectedItem, done: !selectedItem.done })
                }}
              />
              <label>Done</label>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                props.createToDoCallback({
                  id: selectedItem.id,
                  description: selectedItem.description,
                  done: selectedItem.done
                });
              }}
            >
             {selectedItem.id === -1 ? "Create" : "Save" }
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
  if (props.hideForm)
    return null;
  else
    return drawForm();
}