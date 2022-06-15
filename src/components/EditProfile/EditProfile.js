import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext, FirebaseContext } from '../../App';
import { updateUserData } from '../../services/userService';
import Navigation from '../Navigation/Navigation';
import styles from './EditProfile.module.css';

export default function EditProfile() {
    const navigate = useNavigate();
    const { db } = useContext(FirebaseContext);
    const { user, userData } = useContext(CurrentUserContext);
    const [fullName, setFullName] = useState(null);
    const [description, setDescription] = useState(null);
    const [gender, setGender] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/sign-in');
        }

    }, [])

    useEffect(() => {
        if (userData) {
            setFullName(userData.fullName)
            if (userData.description.length > 0) {
                setDescription(userData.description.join('\n'))
            }

            if (userData.phoneNumber) {
                setPhoneNumber(userData.phoneNumber);
            }

            if (userData.gender) {
                setGender(userData.gender);
            }

        }

    }, [])

    const fullNameChangeHandler = (e) => {
        setFullName(e.target.value);
    };

    const bioChangeHandler = (e) => {
        setDescription(e.target.value);
    }

    const phoneNumberChangeHandler = (e) => {
        setPhoneNumber(e.target.value);
    }

    const genderChangeHandler = (e) => {
        setGender(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();

        let desc = description.split('\n');


        updateUserData(db, userData.email, fullName, desc, phoneNumber, gender)
            .then(() => {
                navigate('/' + userData.username);
            })
    }

    return (
        <>
            <Navigation></Navigation>
            <div className={styles.background}>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <h1 className={styles.heading} >Edit Profile</h1>
                        <form onSubmit={submitForm} className={styles.form}>
                            <div className={styles.inputDiv}>
                                <label className={styles.label} htmlFor="fullName">Full Name</label>
                                <input className={styles.input} onChange={fullNameChangeHandler} value={fullName} id="fullName" type="text" />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.label} htmlFor="bio">Bio</label>
                                <textarea className={[styles.input, styles.textarea].join(' ')} onChange={bioChangeHandler} value={description} type="text" />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.label} htmlFor="phoneNumber">Phone Number</label>
                                <input className={styles.input} onChange={phoneNumberChangeHandler} value={phoneNumber} id="phoneNumber" type="text" />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.label} htmlFor="gender">Gender</label>
                                <input className={styles.input} onChange={genderChangeHandler} value={gender} id="gender" type="text" />
                            </div>
                            <div className={styles.inputDivBtn}>   
                                <button className={styles.submit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )   
}