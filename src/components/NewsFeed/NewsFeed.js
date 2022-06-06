import styles from './NewsFeed.module.css';

import { CurrentUserContext, FirebaseContext } from '../../App';
import Post from '../Post/Post';
import SuggestedUser from './SuggestedUser/SuggestedUser';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

import { signOut } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewsFeed() {
    const navigate = useNavigate();
    const user = useContext(CurrentUserContext);
    const { auth } = useContext(FirebaseContext);


    useEffect(() => {
        if (!user) {
            navigate('/sign-in');
        }
    }, [])

    function logoutHandler() {
        signOut(auth)
            .then(() => {
                navigate('/sign-in')
            })
    }

    return (
        <>
        <Navigation></Navigation>
        <main className={styles.main}>
            <div className={styles.contentSection}>
                <div className={styles.postsSection}>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </div>
                <div className={styles.suggestionSection}>
                    <div className={styles.userDetails}>
                        <div className={styles.userProfilePicContainer}>
                            <img src="/images/defaultPic.jpg" alt="" />
                        </div>
                        <div className={styles.userNames}>
                            <p className={styles.username}>the username</p>
                            <p className={styles.fullName}>Full Name</p>
                        </div>
                        <div className={styles.actionButton}>
                            <button onClick={logoutHandler}>Logout</button>
                        </div>
                    </div>

                    <div className={styles.suggestionDivider}>
                        <p className={styles.suggestionsForYou}>Suggestions For You</p>
                    </div>

                    <div className={styles.suggestedUsersContainer}>
                        <SuggestedUser></SuggestedUser>
                        <SuggestedUser></SuggestedUser>
                        <SuggestedUser></SuggestedUser>
                        <SuggestedUser></SuggestedUser>
                        <SuggestedUser></SuggestedUser>
                    </div>

                    <div className={styles.footerContainer}>
                        <Footer></Footer>
                    </div>

                </div>
            </div>
        </main>
        </>
    )
}