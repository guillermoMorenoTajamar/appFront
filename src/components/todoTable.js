import React from 'react';
import ToDoRow from "./toDoRow";

export default function TodoTable(props) {

  const drawLoading = () => {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  const drawTable = () => {
    return (
      <div className="card">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              props.toDoItems.map(data =>
                <ToDoRow
                  key={data.id}
                  toDoItem={data}
                  deleteCallback={props.deleteCallback}
                  checkDoneCallback={props.checkDoneCallback}
                  editCallback={props.editCallback}
                />
              )
            }
          </tbody>
        </table>
      </div>
    )
  }

  if (props.loading) return drawLoading();
  return drawTable();
}