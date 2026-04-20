import { useReducer } from 'react';
import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';

let nextId = 3;

const initialTasks = [
  { id: 0, text: 'Visitar el Museo Kafka', done: true },
  { id: 1, text: 'Ver espectaculo de titeres', done: false },
  { id: 2, text: 'Foto del muro de Lennon', done: false }
];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case 'changed': {
      return tasks.map(task => {
        if (task.id === action.task.id) {
          return action.task;
        }
        return task;
      });
    }
    case 'deleted': {
      return tasks.filter(task => task.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <section className="task-app">
      <h1>Itinerario de Praga</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </section>
  );
}
