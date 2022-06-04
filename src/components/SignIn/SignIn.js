import styles from './SignIn.module.css';
import InputField from './InputField/InputField';

import {useState} from 'react';

export default function SignUp() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    function onChangeHandler(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    function submitFormHandler(e) {
        e.preventDefault();
    }

    return (
        <main className={styles.main}>
            <div className={styles.outerContainer}>
                <div className={styles.formContainer}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src="/images/logo.png" alt="" />
                    </div>
                    <form onSubmit={submitFormHandler} className={styles.form}>
                        <InputField 
                            onChangeHandler={onChangeHandler}
                            inputName="email"
                            inputValue={email}
                        ></InputField>
                        <InputField 
                            onChangeHandler={onChangeHandler}
                            inputName="password"
                            inputValue={password}
                        ></InputField>
                        <button>Log In</button>
                    </form>

                    <div className={styles.dividerDiv}>
                        <div className={styles.horizontalLine}></div>
                        <span className={styles.or}>OR</span>
                        <div className={styles.horizontalLine}></div>
                    </div>

                    <button className={styles.connectFacebook}>
                        <span className={styles.fbIcon}><img className={styles.fbIconImg} src="/images/fbIcon.png" alt="" /></span>
                        <span className={styles.fbText}>Log in with Facebook</span>
                    </button>

                    <div className={styles.forgotPasswordContainer}>
                        <a className={styles.forgotPassword} href=''>Forgot Password?</a>
                    </div>
                </div>

                <div className={styles.noAccountDiv}>
                    <span>Don't have an account? <a href="">Sign up</a></span>
                </div>

                <div className={styles.getTheApp}>
                    <p>Get the app.</p>
                    <div className={styles.appStoreImgContainer}>
                        <img className={styles.appStoreImg} src="/images/appStore.png" alt="" />
                    </div>
                </div>
            </div>
        </main>
    )
}