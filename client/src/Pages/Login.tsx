import { Form, Link } from "react-router-dom"
import styles from './styles/Login.module.css'

export const Login = () =>{
    return(
        <div className={styles.formContainer}>
            <h5>Login</h5>
            <Form className={styles.form} action="/login" method="POST">
                <input type ="email" name="email" placeholder="Email"/>
                <input type ="password" name="password" placeholder="Password" />
                <input type ="submit" value={"Login"}/>
                <div>
                    <Link to={'/signup'}>Signup</Link>
                </div>
            </Form>

        </div>
    )
}