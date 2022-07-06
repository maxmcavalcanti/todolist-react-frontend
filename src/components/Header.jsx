import styles from './Header.module.css'
import logoToDo from '../assets/rocket-logo.svg'

export function Header () {
  return(
    <header>
      <div className={styles.headerLogo}>
        <img src={logoToDo}/>
        <span className={styles.blueText}>to</span><span className={styles.purpleText}>do</span>
      </div>
    </header>
  )
}