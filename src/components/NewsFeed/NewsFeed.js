import styles from './NewsFeed.module.css';

import { CurrentUserContext, FirebaseContext } from '../../App';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

import { signOut } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { allPostsLoaded, loadNewsFeedPosts } from '../../services/postService';
import Loader from './Loader/Loader';
import Suggestions from './Suggestions/Suggestions';
import { loadSuggestedUsers } from '../../services/userService';

export default function NewsFeed() {
    const navigate = useNavigate();
    const { user, userData } = useContext(CurrentUserContext);
    const { auth, db } = useContext(FirebaseContext);

    const [suggestedUsers, setsuggestedUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loadMore, setLoadMore] = useState(true);



    useEffect(() => {
        if (!user) {
            navigate('/sign-in');
        }

    }, [])

    useEffect(() => {
        if(userData) {
            loadPostsData();
            loadSuggestions();
        }
    }, [userData])

    function logoutHandler() {
        signOut(auth)
            .then(() => {
                navigate('/sign-in')
            })
    }

    if (!userData) {
        return;
    }

    function loadSuggestions() {
        loadSuggestedUsers(db, userData)
            .then(users => {
                setsuggestedUsers(users);
            })
    }

    function loadPostsData() {
        if (userData.email !== user.email) {
            return;
        }

        loadNewsFeedPosts(db, userData.email, posts.length)
            .then(async (postsData) => {
                const loadMore = await allPostsLoaded(db, userData, posts)
                if (!loadMore) {
                    setLoadMore(false);
                }

                setPosts(postsData);
            })
    }

    return (
        <>
        <Navigation userData={userData}></Navigation>
        <main className={styles.main}>
            <div className={styles.contentSection}>
                <div  className={styles.postsSection}>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={loadPostsData}
                        hasMore={loadMore}
                        loader={<Loader></Loader>}
                        style={{overflow: 'hidden', height: '100%'}}
                    >   
                    <div id='scrollableDiv' className={styles.infinitePosts}>
                        {posts.map(post => <Post postData={post} key={Date.now() + Math.random()} ></Post>)}
                    </div>

                    </InfiniteScroll>
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

                    <Suggestions users={suggestedUsers}></Suggestions>

                    <div className={styles.footerContainer}>
                        <Footer></Footer>
                    </div>

                </div>
            </div>
        </main>
        </>
    )
}