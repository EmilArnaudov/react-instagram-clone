import styles from './UserProfile.module.css';

import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import UserProfileNoPosts from '../UserProfileNoPosts/UserProfileNoPosts';
import useLoadProfileData from '../../hooks/useLoadProfileData';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../App';
import { FirebaseContext } from '../../App';
import { constructChatID, updateUserProfilePic } from '../../services/firestoreService'
import { uploadImageAndGetDownloadUrl } from '../../services/firestoreService'
import { followUser, unFollowUser } from '../../services/userService';
import UserProfilePosts from '../UserProfilePosts/UserProfilePosts';
import UserProfileNoSaved from '../UserProfileNoSaved/UserProfileNoSaved';
import UserProfileNoTagged from '../UserProfileNoTagged/UserProfileNoTagged';
import { createChat, doesChatExist } from '../../services/chatService';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const navigate = useNavigate();
    const { userData } = useContext(CurrentUserContext);
    const { db, storage } = useContext(FirebaseContext)

    const visitedUserData = useLoadProfileData();
    const [content, setContent] = useState('posts')

    if (!visitedUserData || !userData) {
        return;
    }

    const isOwnProfile = userData.email === visitedUserData.email
    const navigatorActiveClass = [styles.contentNavigatorDiv, styles.active].join(' ');

    const displaySavedPosts = () => {
        setContent('saved');
    }

    const displayPosts = () => {
        setContent('posts');
    }

    const displayTaggedPosts = () => {
        setContent('tagged');
    }

    const editProfile = () => {
        navigate('/profile/edit');
    }

    async function imageUploadHandler(e) {
        let url = await uploadImageAndGetDownloadUrl(storage, e.target.files[0]);
        await updateUserProfilePic(db, userData.email, url)
    }

    function followButtonHandler() {
        followUser(db, userData, visitedUserData);
    }

    function unFollowButtonHandler() {
        unFollowUser(db, userData, visitedUserData);
    }

    async function messageUser() {
        const chatExists = await doesChatExist(db, userData, visitedUserData);

        if (chatExists) {
            navigate('/messages/' + constructChatID(userData, visitedUserData));
        } else {
            createChat(db, userData, visitedUserData)
                .then(() => {
                    navigate('/messages/' + constructChatID(userData, visitedUserData));
                })

        }
    }

    return (
         <section className={styles.section}>
            <Navigation></Navigation>
            <main className={styles.main}>
                <div className={styles.innerWrap}>
                    <header className={styles.header}>
                        <div className={styles.userProfileContainer}>

                            {isOwnProfile
                            ?                         
                            <div className={styles.userProfilePictureContainer}>
                                <div className={styles.labelPicContainer}>
                                    <label  htmlFor="profilePic">
                                        <img className={styles.profilePic}
                                         src={userData.profilePic.length > 0 ? userData.profilePic : "/images/defaultPic.jpg"}
                                          alt="" />
                                    </label>
                                </div>
                                <input onChange={imageUploadHandler} className={styles.profilePicInput} name='profilePic' id='profilePic' type="file" />
                            </div>
                            :                         
                            <div className={styles.userProfilePictureContainer}>
                                <div className={styles.labelPicContainer}>
                                    <label  htmlFor="profilePic">
                                        <img className={styles.profilePicNotOwner}
                                         src={visitedUserData.profilePic.length > 0 ? visitedUserData.profilePic : "/images/defaultPic.jpg"}
                                          alt="profile" />
                                    </label>
                                </div>
                            </div>
                            }

                            <div className={styles.userDetails}>
                                <div className={styles.usernameAndAction}>
                                    <span className={styles.username}>{visitedUserData.username}</span>
                                    {isOwnProfile 
                                    ? <button onClick={editProfile}  className={styles.editProfileBtn}>Edit Profile</button> 
                                    : (visitedUserData.followers.includes(userData.email) 
                                        ? 
                                        <>
                                        <button onClick={unFollowButtonHandler} className={styles.editProfileBtn}>Unfollow</button>
                                        <button onClick={messageUser} className={styles.editProfileBtn}>Message</button>
                                        </>
                                        : <button onClick={followButtonHandler} className={styles.followBtn}>Follow</button>) 
                                     }

                                </div>
                                <div className={styles.activityDetails}>
                                    <span className={styles.posts}><span className={styles.bold}>{visitedUserData.ownPosts.length}</span> posts</span>
                                    <span className={styles.followers}><span className={styles.bold}>{visitedUserData.followers.length}</span> followers</span>
                                    <span className={styles.following}><span className={styles.bold}>{visitedUserData.following.length}</span> following</span>
                                </div>
                                <div className={styles.fullNameContainer}>
                                    <p className={styles.bold}>{visitedUserData.fullName}</p>
                                </div>
                                <div className={styles.description}>
                                    <p>{visitedUserData.description.length > 0 ? visitedUserData.description.join('\n') : ''}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={styles.contentNavigator}>
                        <div className={content === 'posts' ? navigatorActiveClass : styles.contentNavigatorDiv}>
                            <span onClick={displayPosts} className={styles.spanActive}><i className="fa-solid fa-table-cells"></i>POSTS</span>
                        </div>
                        {isOwnProfile
                        ?                         
                        <div className={content === 'saved' ? navigatorActiveClass : styles.contentNavigatorDiv}>
                            <span onClick={displaySavedPosts}><i className="fa-solid fa-bookmark"></i>SAVED</span>
                        </div>
                        : ''
                        }
                        <div className={content === 'tagged' ? navigatorActiveClass : styles.contentNavigatorDiv}>
                            <span onClick={displayTaggedPosts}><i className="fa-solid fa-image-portrait"></i>TAGGED</span>
                        </div>
                    </div>
                    
                    {(visitedUserData.ownPosts.length === 0 && content === 'posts') ? <UserProfileNoPosts isOwnProfile={isOwnProfile} ></UserProfileNoPosts> : ''}
                    {(visitedUserData.ownPosts.length > 0 && content === 'posts') ? <UserProfilePosts postsIds={visitedUserData.ownPosts}/> : ''}

                    {(visitedUserData.savedPosts.length === 0 && content === 'saved') ? <UserProfileNoSaved ></UserProfileNoSaved> : ''}
                    {(visitedUserData.savedPosts.length > 0 && content === 'saved') ? <UserProfilePosts postsIds={visitedUserData.savedPosts}/> : ''}

                    
                    {(visitedUserData.taggedPosts.length === 0 && content === 'tagged') ? <UserProfileNoTagged ></UserProfileNoTagged> : ''}
                    {(visitedUserData.taggedPosts.length > 0 && content === 'tagged') ? <UserProfilePosts postsIds={visitedUserData.taggedPosts}/> : ''}
                        
                </div>
            </main>


            <div className={styles.footerContainer}>
                <Footer></Footer>
            </div>
        </section>
    )
}