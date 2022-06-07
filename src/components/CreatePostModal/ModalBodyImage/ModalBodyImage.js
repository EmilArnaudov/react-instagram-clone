import { useContext, useState, useCallback } from 'react';
import { CurrentUserContext, FirebaseContext } from '../../../App';
import { getUserDataWithUsername } from '../../../services/firestoreService';
import styles from './ModalBodyImage.module.css';
import debounce from 'lodash.debounce'
import { createNewPost } from '../../../services/postService';

export default function ModalBodyImage({
    Modal,
    handleClose,
    imageUrl,
    reset
}) {
    const { db } = useContext(FirebaseContext);
    const { userData } = useContext(CurrentUserContext);

    let [caption, setCaption] = useState('');
    let [searchedPerson, setSearchedPerson] = useState('');
    let [taggedPeople, setTaggedPeople] = useState([]);
    let [location, setLocation] = useState('');

    const debouncedUserSearch = useCallback(debounce((e) => {
        getUserDataWithUsername(db, e.target.value)
        .then(person => {
            if (person) {
                setTaggedPeople(oldState => {
                    return [...oldState, person];
                })
                setSearchedPerson('');
            }
        })
    }, 500), []);

    function handleCaptionChange(e) {
        setCaption(e.target.value);
    }

    function handleTaggedPeopleChange(e) {

        setSearchedPerson(e.target.value);

        console.log(e.target.value);
        debouncedUserSearch(e);
        
    }

    function handleLocationChange(e) {
        setLocation(e.target.value);
    }

    function removeTaggedPerson(e, person) {
        console.log(person);
        setTaggedPeople(oldState => {
            return oldState.filter(x => x.email !== person.email)
        })
    }

    function createPostHandler() {
        createNewPost(db, caption, taggedPeople, location, imageUrl, userData.username, userData.profilePic);
        reset();
        handleClose();
    }

    function changePostImageHandler() {
        reset();
    }

    if (!userData) {
        return;
    }

    return (
        <>
        <Modal.Header className={styles.modalHeading}>
            <div className={styles.headerContainer}>
                <span onClick={changePostImageHandler} className={styles.goBackBtn} ><i className="fa-solid fa-arrow-left-long"></i></span>
                <h1 className={styles.headerText}>New Post</h1>
                <span onClick={createPostHandler} className={styles.createPostBtn} ><i className="fa-solid fa-check"></i></span>
            </div>

        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
            <div className={styles.postDetails}>
                <div className={styles.captionDiv}>
                    <div className={styles.userProfilePicContainer}>
                        <img
                            className={styles.userProfilePic}
                            src={userData.profilePic.length > 0 ? userData.profilePic : "/images/defaultPic.jpg"}
                            alt=""
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input 
                        onChange={handleCaptionChange} 
                        value={caption} className={styles.captionInput} type="text" placeholder='Write a caption..' />
                    </div>
                    <div className={styles.postImageContainer}>
                        <img className={styles.postImage} src={imageUrl} alt="Post Image" />
                    </div>
                </div>

                <div className={styles.subheadingDiv}>
                    <h2 className={styles.subheading}>Tag People</h2>
                    <input value={searchedPerson} onChange={handleTaggedPeopleChange} type="text" className={styles.captionInput} placeholder='Name..' />
                    {taggedPeople.length > 0 
                    ? 
                    <div className={styles.taggedPeople}>
                        {taggedPeople.map(person => 
                        <div className={styles.taggedPersonDiv}>
                            <span onClick={(e) => {removeTaggedPerson(e, person);}} className={styles.taggedPersonIcon}><i className="fa-solid fa-circle-xmark"></i></span>
                            <span key={Date.now() + Math.random()} className={styles.taggedPerson} >{person.username}</span>
                        </div>
                        )}
                    </div>
                    : ''}
                </div>

                <div className={styles.subheadingDiv}>
                    <h2 className={styles.subheading}>Add Location</h2>
                    <input
                     onChange={handleLocationChange}
                     value={location}
                     type="text" className={styles.captionInput} placeholder='Location..' />
                </div>
            </div>
            </Modal.Body>
        </>
    )
}