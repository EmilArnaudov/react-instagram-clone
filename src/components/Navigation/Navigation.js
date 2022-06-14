import styles from './Navigation.module.css';
import { CurrentUserContext } from '../../App'

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CreatePostModal from '../CreatePostModal/CreatePostModal';

export default function Navigation({
}) {
    const {userData} = useContext(CurrentUserContext)

    //Modal functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!userData) {
        return;
    }

    return (
        <>
        <nav className={styles.nav}>
            <div className={styles.navItemsContainer}>
                <div className={styles.navSectionLong}>
                    <div className={styles.logoContainer}>
                        <Link to='/'><img className={styles.logo} src="/images/logo.png" alt="" /></Link>
                    </div>
                </div>
                <div className={styles.navSectionShort}>
                    <label htmlFor="search"><i className={["fa-solid", "fa-magnifying-glass", styles.icon].join(' ')}></i></label>
                    <input name='search' id='search' className={styles.searchInput} type="text" placeholder='Search' />
                </div>
                <div className={[styles.navSectionLong, styles.right].join(' ')}>
                    <div className={styles.navMenu}>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/'><i className="fa-solid fa-house"></i></Link>
                        </div>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/messages/inbox'><i className="fa-solid fa-paper-plane"></i></Link>
                        </div>
                        <div className={styles.navMenuIconDiv}>
                            <span to='/' onClick={handleShow} className={styles.link}><i className="fa-solid fa-circle-plus"></i></span>
                        </div>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/'><i className="fa-solid fa-heart"></i></Link>
                        </div>
                        <div className={styles.userProfilePic}>
                            <Link className={styles.link} 
                            to={'/' + userData.username}>
                                <img 
                                className={styles.profilePic} 
                                src={userData.profilePic.length > 0 ? userData.profilePic : "/images/defaultPic.jpg"} 
                                alt=""
                                 />
                            </Link>
                        </div>
                    </div>
                </div>          

            </div>
        </nav>

        <CreatePostModal
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
        ></CreatePostModal>

        </>
    )
}