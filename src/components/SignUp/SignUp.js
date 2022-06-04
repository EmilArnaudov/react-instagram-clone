import styles from './SignUp.module.css';

import {useState} from 'react';

export default function SignUp() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let spanActiveClasses = [styles.inputHeading];
    let spanInactiveClasses = [styles.inputHeading, styles.inputHeadingNoInput];

    function onChangeHandler(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.outerContainer}>
                <div className={styles.formContainer}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src="/images/logo.png" alt="" />
                    </div>
                    <form className={styles.form}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">
                            <span className={email.length > 0 ? spanActiveClasses.join(' ') : spanInactiveClasses.join(' ')}>Email</span>
                            </label>
                            <input className={email.length > 0 ? '' : styles.inputFieldNoInput} value={email} onChange={onChangeHandler} type="text" name="email" id="email"/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">
                            <span className={password.length > 0 ? spanActiveClasses.join(' ') : spanInactiveClasses.join(' ')}>Password</span>
                            </label>
                            <input className={password.length > 0 ? '' : styles.inputFieldNoInput} value={password} onChange={onChangeHandler} type="password" name="password" id="password"/>
                        </div>
                        <button>Log In</button>
                    </form>
                </div>
            </div>
        </main>
    )
}