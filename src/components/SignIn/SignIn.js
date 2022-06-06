import styles from './SignIn.module.css';
import InputField from './InputField/InputField';
import { emailValidator, passwordValidator } from '../../validators/signInFormValidators'

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUserContext, FirebaseContext } from '../../App';
import { signInWithEmailAndPassword } from 'firebase/auth';
 
export default function SignIn() {
    const navigate = useNavigate();
    const { auth } = useContext(FirebaseContext);
    const {user} = useContext(CurrentUserContext);

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [isEmailValid, setIsEmailValid] = useState(false);
    let [isPasswordValid, setIsPasswordValid] = useState(false);

    function onChangeHandler(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value);

            setIsEmailValid(emailValidator(e.target.value));
        } else {
            setPassword(e.target.value);

            setIsPasswordValid(passwordValidator(e.target.value));
        }
    }

    function submitFormHandler(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
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
                        <button 
                        disabled={(isEmailValid && isPasswordValid) ? '' : true}
                        className={(isEmailValid && isPasswordValid) ? '' : styles.buttonDisabled} >Log In</button>
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
                    <span>Don't have an account? <Link to='/sign-up'>Sign up</Link></span>
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