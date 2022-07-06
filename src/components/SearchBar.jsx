import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import styles from './SearchBar.module.css'
import { v4 as uuidv4 } from 'uuid';

export function SearchBar({addToTask}){
  const  [newTask, setNewTask] = useState({
    text:'',
    completed:false
  })

  function handleNewTask(event){
    setNewTask({
      ...newTask,
      text:event.target.value
    })
  }

  function handleSubmitTask() {
    event.preventDefault()
    addToTask(newTask)
    setNewTask({
      text:'',
      completed:false
      }
    )
  }

  return (
    <main className={styles.toDoListPageContainer}>
      <div className={styles.searchBarContainer}>
      <form onSubmit={handleSubmitTask}>
        <div className={styles.stretch}>
          <input 
          required
          onChange={handleNewTask}
          value={newTask.text}
          type='text' 
          placeholder='Adicione uma nova tarefa'>
          </input>
        </div>
        <div className={styles.noStretch}>
          <button type='input'>Criar <span><PlusCircle size={16} weight='bold'/></span></button>
        </div>
      </form>
      </div>
    </main>
  )
}