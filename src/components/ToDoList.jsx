import styles from './ToDoList.module.css'
import { useState, useEffect } from 'react'
import { Task } from './Task'
import { SearchBar } from './SearchBar'
import Clipboard from '../assets/clipboard-image.svg'
import { useAPI } from '../hooks/useAPI'
import axios from 'axios'

const URLVite = import.meta.env.VITE_API_URL
console.log(URLVite)


export function ToDoList () {
  const [tasks, setTasks] = useState([])
 

  const { data, isFetching } = useAPI(URLVite)


  useEffect(() => {
    if(data){
      setTasks(data)
    }
  },[data])

  const createdTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const isTaskEmpty = tasks.length === 0;
  
  function addToList(task){
    axios.post(URLVite,task)
    .then(response => {
      setTasks([...tasks,response.data])
    })
  }

  async function updateTask(task){
      try {
      await axios.put(`${URLVite}${task._id}`,task);
      setTasks(tasks.map(t => t._id === task._id ? task : t))
  
      } 
      catch (error) {
      console.log(error)
    }
 

    
  }


  async function deleteTask(taskToDeleteId){

    try {
      await axios.delete(`${URLVite}${taskToDeleteId}`);
      setTasks([...tasks.filter(task => task._id !== taskToDeleteId)])
    }
    catch (error) {
      console.log(error)
    }
  }

   

  return(
    <>
    <SearchBar addToTask={addToList}/>
    {isFetching && <div>Loading...</div> }
    <div className={styles.toDoListContainer}>
      <div className={styles.toDoListHeader}>
        <div className={styles.headerCreatedTasks}>
          <span>Tarefas Criadas</span>
          <div className={styles.counter}>{createdTasks}</div>
        </div>
        <div className={styles.headerFinishedTasks}>
           <span>Tarefas Concluídas</span>
           <div className={styles.counter}>
           {isTaskEmpty ? 0 :`${completedTasks} de ${createdTasks}`}
           
           </div>
        </div>
      </div>

      <div className={styles.toDoListBody}>
        <div>{isTaskEmpty 
         ?<div className={styles.taskComponentEmpty}>
            <div className={styles.taskComponentEmptyBody}>
              <img src={Clipboard} height={56} width={56}/>
              <div>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
           </div> 
          :tasks.map(task => {
          return(<Task 
            key={task._id}
            id={task._id}
            text={task.text}
            completed={task.completed}
            onCheck={updateTask}
            onDelete={deleteTask}
            />
            )
          })
        }
         </div>
      </div>
    </div>
    </>
  )
}