import styles from './SignUp.module.css';

import { useState } from 'react';
import InputField from '../SignIn/InputField/InputField';

export default function SignUp() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [fullName, setFullName] = useState('');
    let [username, setUsername] = useState('');

    function onChangeHandler(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value);
        } else if (e.target.id === 'password') {
            setPassword(e.target.value);
        } else if (e.target.id === 'full name') {
            setFullName(e.target.value)
        } else if (e.target.id === 'username') {
            setUsername(e.target.value)
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
                <div className={styles.subHeadingContainer}>
                    <p className={styles.subHeadingText}>Sign up to see photos and videos from your friends.</p>
                </div>
                <button className={styles.connectFacebook}>
                    <span className={styles.fbIcon}><img className={styles.fbIconImg} src="/images/fbIconWhite.png" alt="" /></span>
                    <span className={styles.fbText}>Log in with Facebook</span>
                </button>

                <div className={styles.dividerDiv}>
                    <div className={styles.horizontalLine}></div>
                    <span className={styles.or}>OR</span>
                    <div className={styles.horizontalLine}></div>
                </div>

                <form onSubmit={submitFormHandler} className={styles.form}>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="email"
                        inputValue={email}
                    ></InputField>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="full name"
                        inputValue={fullName}
                    ></InputField>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="username"
                        inputValue={username}
                    ></InputField>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="password"
                        inputValue={password}
                    ></InputField>
                    <div className={styles.legalThings}>
                        <p>People who use our service may have uploaded your contact information to Instagram. <b>Learn More</b></p>
                        <p>By signing up, you agree to our Terms . Learn how we collect, use and share your data in our <b>Data Policy</b> and how we use cookies and similar technology in our <b>Cookies Policy</b> .</p>
                    </div>
                    <button>Sign Up</button>
                </form>

            </div>



            <div className={styles.noAccountDiv}>
                <span>Have an account? <a href="">Sign in</a></span>
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