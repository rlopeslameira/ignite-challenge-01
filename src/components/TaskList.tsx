import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<Boolean>(false);

  function handleCreateNewTask() {
    setError(false);
    if (newTaskTitle.length < 1)
    {
      setError(true);
      return;
    }

    setTasks([...tasks, {id: Date.now(), title: newTaskTitle, isComplete: false}]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const resultado = tasks.map((task) => ({ ...task, isComplete: task.id === id ? true : task.isComplete }));
    setTasks(resultado);
  }

  function handleRemoveTask(id: number) {
    let lista = [...tasks];
    lista.splice(tasks.findIndex(task => task.id === id), 1);
    setTasks(lista);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            className={error ? 'error' : ''}
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}