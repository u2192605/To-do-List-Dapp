import styles from './styles/TopBar.module.css'

export const TopBar = ()=>{
    return(
        <header className={styles.topBarContainer}>
            <h1>Todo List</h1>
            <div className={styles.leftPart}>
                <div className={styles.btn}>Signup</div>
                <div className={styles.btn}>Login</div>
            </div>
        </header>

    )
}