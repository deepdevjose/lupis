import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.jsx';

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  let contextTasks = [];
  let dispatch = null;

  try {
    contextTasks = useTasks();
    dispatch = useTasksDispatch();
  } catch {
    contextTasks = [];
    dispatch = null;
  }

  const resolvedTasks = tasks ?? contextTasks;

  function handleChangeTask(task) {
    if (onChangeTask) {
      onChangeTask(task);
      return;
    }

    if (dispatch) {
      dispatch({ type: 'changed', task });
    }
  }

  function handleDeleteTask(taskId) {
    if (onDeleteTask) {
      onDeleteTask(taskId);
      return;
    }

    if (dispatch) {
      dispatch({ type: 'deleted', id: taskId });
    }
  }

  return (
    <ul>
      {resolvedTasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={handleChangeTask}
            onDelete={handleDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={event => {
            onChange({
              ...task,
              text: event.target.value
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Guardar</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Editar</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={event => {
          onChange({
            ...task,
            done: event.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </label>
  );
}
