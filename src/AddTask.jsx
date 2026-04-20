import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.jsx';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  let dispatch;
  try {
    dispatch = useTasksDispatch();
  } catch {
    dispatch = null;
  }

  return (
    <>
      <input
        placeholder="Agregar tarea"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        const trimmedText = text.trim();
        if (trimmedText.length === 0) {
          return;
        }

        if (onAddTask) {
          onAddTask(trimmedText);
        } else if (dispatch) {
          dispatch({
            type: 'added',
            id: nextId++,
            text: trimmedText,
          });
        }

        setText('');
      }}>Agregar</button>
    </>
  );
}

let nextId = 3;
