import styles from './SignUp.module.css';
import InputField from '../SignIn/InputField/InputField';
import { emailValidator, fullNameValidator, passwordValidator, usernameValidator } from '../../validators/signUpFormValidators';
import { CurrentUserContext, FirebaseContext } from '../../App';
import { addNewUserToDatabase } from '../../services/firestoreService';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
    const { db, auth } = useContext(FirebaseContext)
    const {user} = useContext(CurrentUserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [fullName, setFullName] = useState('');
    let [username, setUsername] = useState('');
    let [isEmailValid, setIsEmailValid] = useState(undefined);
    let [isPasswordValid, setIsPasswordValid] = useState(undefined);
    let [isFullNameValid, setIsFullNameValid] = useState(undefined);
    let [isUsernameValid, setIsUsernameValid] = useState(undefined);



    //Set timeout containers for input fields with async validations so we can debounce them easy
    let emailValidatorTimeout;
    let passwordValidatorTimeout;
    let fullNameValidatorTimeout;
    let usernameValidatorTimeout;

    function onChangeHandler(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value);
            
            clearTimeout(emailValidatorTimeout);
            setTimeout(() => {
                emailValidator(db, e.target.value)
                .then(isValid => {
                    setIsEmailValid(isValid);
                })
            }, 500)

        } else if (e.target.id === 'password') {
            setPassword(e.target.value);

            clearTimeout(passwordValidatorTimeout);
            setTimeout(() => {
                setIsPasswordValid(passwordValidator(e.target.value))
            }, 500)

        } else if (e.target.id === 'full name') {
            setFullName(e.target.value)

            clearTimeout(fullNameValidatorTimeout);
            setTimeout(() => {
                setIsFullNameValid(fullNameValidator(e.target.value));
            }, 500)

        } else if (e.target.id === 'username') {
            setUsername(e.target.value);

            clearTimeout(usernameValidatorTimeout);
            setTimeout(() => {
                usernameValidator(db, e.target.value)
                .then(isValid => {
                    setIsUsernameValid(isValid);
                })
            }, 500)
        }
    }

    function submitFormHandler(e) {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                addNewUserToDatabase(db, {email, fullName, username})
                navigate('/');
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

                <form autoComplete='off' onSubmit={submitFormHandler} className={styles.form}>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="email"
                        inputValue={email}
                        isValid={isEmailValid}
                    ></InputField>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="full name"
                        inputValue={fullName}
                        isValid={isFullNameValid}
                    ></InputField>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="username"
                        inputValue={username}
                        isValid={isUsernameValid}
                    ></InputField>
                    <InputField 
                        onChangeHandler={onChangeHandler}
                        inputName="password"
                        inputValue={password}
                        isValid={isPasswordValid}
                    ></InputField>
                    <div className={styles.legalThings}>
                        <p>People who use our service may have uploaded your contact information to Instagram. <b>Learn More</b></p>
                        <p>By signing up, you agree to our Terms . Learn how we collect, use and share your data in our <b>Data Policy</b> and how we use cookies and similar technology in our <b>Cookies Policy</b> .</p>
                    </div>
                    <button

                        className={(isPasswordValid && isEmailValid && isUsernameValid && isFullNameValid) ? '' : styles.buttonDisabled} 
                        disabled={(isPasswordValid && isEmailValid && isUsernameValid && isFullNameValid) ? '' : true} >
                        Sign Up
                    </button>
                </form>

            </div>



            <div className={styles.noAccountDiv}>
                <span>Have an account? <Link to='/sign-in'>Sign in</Link></span>
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