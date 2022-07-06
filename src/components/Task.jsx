import styles from './ToDoList.module.css'
import {Trash} from 'phosphor-react'
import { useState } from 'react'

export function Task({text, onCheck, id, onDelete, completed}) {
  const [isChecked, setIsChecked] = useState(completed)



  function handleCheckBox() {
    setIsChecked(!isChecked)
     const newStatusTask = {
        _id:id,
        text:text,
        completed:!isChecked
      }
    onCheck(newStatusTask)
      }
 
  function handleDeleteTask(){
        onDelete(id)
  }

  return(
    <div className={styles.taskComponent}>
    
      <div className={styles.round}>
  
       <input type="checkbox" 
       {...{defaultChecked:completed}}
       onClick={handleCheckBox} 
       className={styles.checkbox} 
        /> 
      </div>
      <p className={isChecked ? styles.checked : ''}>{text}</p>
      <span onClick={handleDeleteTask} className={styles.trash}><Trash size={16}/></span>
    </div>
  )
}