import styles from './NewsFeed.module.css';

import { CurrentUserContext, FirebaseContext } from '../../App';
import Post from '../Post/Post';
import SuggestedUser from './SuggestedUser/SuggestedUser';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

import { signOut } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadNewsFeedPosts } from '../../services/postService';
import Loader from './Loader/Loader';

export default function NewsFeed() {
    const navigate = useNavigate();
    const {user, userData} = useContext(CurrentUserContext);
    const { auth, db } = useContext(FirebaseContext);

    const [posts, setPosts] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(false);



    useEffect(() => {
        if (!user) {
            navigate('/sign-in');
        }
    }, [])

    useEffect(() => {
        if(userData) {
            loadPostsData();
        }
        
    }, [initialLoad])

    function logoutHandler() {
        signOut(auth)
            .then(() => {
                navigate('/sign-in')
            })
    }

    if (!userData) {
        return;
    }

    // I have to do this because the use effect tries to render while userData is still null and crashes the app
    // And if we do not have an initial load the content loads only after the users starts scrolling which is not a good ux
    //Put in if to prevent infinite loop
    if (!initialLoad) {
        //Activate first post load
        if(userData) {
            setInitialLoad(true);
        } else {
            setInitialLoad(false);
        }
        
    }



    function loadPostsData() {
        loadNewsFeedPosts(db, userData.email, posts.length)
            .then(postsData => {
                if (posts.length > 0 && posts.length < 5) {
                    return;
                }
                setPosts(oldState => oldState.concat(postsData));
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
                        style={{overflow: 'none', height: '100%'}}
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