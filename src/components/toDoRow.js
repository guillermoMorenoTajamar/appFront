import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

export default function ToDoRow(props) {
  return (
    <tr>
      <td>{props.toDoItem.description}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={props.toDoItem.done}
          onChange={() => { props.checkDoneCallback(props.toDoItem.id) }}
        />
      </td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => { props.editCallback(props.toDoItem.id) }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => { props.deleteCallback(props.toDoItem.id) }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>

    </tr>
  )
}