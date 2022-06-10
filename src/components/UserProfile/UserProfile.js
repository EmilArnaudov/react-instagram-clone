import styles from './UserProfile.module.css';

import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import UserProfileNoPosts from '../UserProfileNoPosts/UserProfileNoPosts';
import useLoadProfileData from '../../hooks/useLoadProfileData';
import { useContext } from 'react';
import { CurrentUserContext } from '../../App';
import { FirebaseContext } from '../../App';
import { updateUserProfilePic } from '../../services/firestoreService'
import { uploadImageAndGetDownloadUrl } from '../../services/firestoreService'
import { followUser } from '../../services/userService';
import UserProfilePosts from '../UserProfilePosts/UserProfilePosts';

export default function UserProfile() {
    const { userData } = useContext(CurrentUserContext);
    const { db, storage } = useContext(FirebaseContext)

    const visitedUserData = useLoadProfileData();


    if (!visitedUserData || !userData) {
        return;
    }

    const isOwnProfile = userData.email === visitedUserData.email

    async function imageUploadHandler(e) {
        let url = await uploadImageAndGetDownloadUrl(storage, e.target.files[0]);
        await updateUserProfilePic(db, userData.email, url)
    }

    function followButtonHandler() {
        followUser(db, userData, visitedUserData);
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
                                          alt="" />
                                    </label>
                                </div>
                            </div>
                            }

                            <div className={styles.userDetails}>
                                <div className={styles.usernameAndAction}>
                                    <span className={styles.username}>{visitedUserData.username}</span>
                                    {isOwnProfile 
                                    ? <button  className={styles.editProfileBtn}>Edit Profile</button> 
                                    : (visitedUserData.followers.includes(userData.email) 
                                        ? <button  className={styles.editProfileBtn}>Message</button>
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
                            </div>
                        </div>
                    </header>

                    <div className={styles.contentNavigator}>
                        <div className={[styles.contentNavigatorDiv, styles.active].join(' ')}>
                            <span className={styles.spanActive}><i className="fa-solid fa-table-cells"></i>POSTS</span>
                        </div>
                        {isOwnProfile
                        ?                         
                        <div className={styles.contentNavigatorDiv}>
                            <span><i className="fa-solid fa-bookmark"></i>SAVED</span>
                        </div>
                        : ''
                        }
                        <div className={styles.contentNavigatorDiv}>
                            <span><i className="fa-solid fa-image-portrait"></i>TAGGED</span>
                        </div>
                    </div>
                    {(visitedUserData.ownPosts.length === 0 ? <UserProfileNoPosts isOwnProfile={isOwnProfile} ></UserProfileNoPosts> : '')}
                    {visitedUserData.ownPosts.length > 0 ? <UserProfilePosts postsIds={visitedUserData.ownPosts}/> : ''}
                        
                </div>
            </main>


            <div className={styles.footerContainer}>
                <Footer></Footer>
            </div>
        </section>
    )
}