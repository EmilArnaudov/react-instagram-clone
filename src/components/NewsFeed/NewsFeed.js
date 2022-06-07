import styles from './NewsFeed.module.css';

import { CurrentUserContext, FirebaseContext } from '../../App';
import Post from '../Post/Post';
import SuggestedUser from './SuggestedUser/SuggestedUser';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

import { signOut } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewsFeed() {
    const navigate = useNavigate();
    const {user, userData} = useContext(CurrentUserContext);
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
        <Navigation userData={userData}></Navigation>
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
                            <Link to={'/' + userData.username} ><img src={userData.profilePic.length > 0 ? userData.profilePic : "/images/defaultPic.jpg"} alt="" /> </Link>
                        </div>
                        <div className={styles.userNames}>
                            <Link className={styles.username} to={'/' + userData.username}>{userData.username}</Link>
                            <p className={styles.fullName}>{userData.fullName}</p>
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