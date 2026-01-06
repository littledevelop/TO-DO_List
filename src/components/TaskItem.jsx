import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, editTask } from "../redux/taskSlice";
export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const handleEdit = () => {

    const newText = prompt("Edit task:", task.text);
    const newPriority = prompt("Edit Priority:", task.priority);
    

    if (newText !== null && newText.trim() !== "") {
      dispatch(editTask({ id: task.id, text: newText.trim(), priority: newPriority }));
    }
  };

  return (
    <>
      <li className={`task ${task.completed ? "completed" : ""}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
        />

        <span className={task.completed ? "completed" : ""}>{task.text}</span>

        {task.priority && (
          <span className={`badge ${task.priority.toLowerCase()}`}>
            {task.priority}{" "}
          </span>
        )}

        {task.dueDate && (
          <span className="due-date">
            {" "}
            <small>(Due: {new Date(task.dueDate).toLocaleDateString()})</small>
          </span>
        )}
      </li>
      <div className="task-button">
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          Delete
        </button>
      </div>
    </>
  );
}
