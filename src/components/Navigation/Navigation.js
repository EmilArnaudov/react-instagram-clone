import styles from './Navigation.module.css';
import { CurrentUserContext, FirebaseContext } from '../../App'

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import SearchResults from './SearchResults/SearchResults';
import { searchUsersInDb } from '../../services/userService';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export default function Navigation({
}) {
    const {userData} = useContext(CurrentUserContext);
    const {db} = useContext(FirebaseContext);


    //Modal functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const debouncedSearchUsers = useCallback(debounce((query) => {
        searchUsers(query);
    }, 500), [])

    const [searchBarValue, setsearchBarValue] = useState('');
    const onSearchChangeHandler = (e) => {
        setsearchBarValue(e.target.value);
        debouncedSearchUsers(e.target.value)
    } 

    //Search result functions
    const [searchResults, setsearchResults] = useState([]);
    const [showSearchResults, setshowSearchResults] = useState(false);
    const showSearch = (e) => {setshowSearchResults(true)};
    const hideSearch = () => {
        setTimeout(() => {
            setshowSearchResults(false)
        }, 100)
    };



    async function searchUsers(query) {
        let users = [];
        if (query) {
            users = await searchUsersInDb(db, query);
        }
        setsearchResults(users);
    }

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
                    <form autoComplete='off'>

                    <label htmlFor="searchBarNeww"><i className={["fa-solid", "fa-magnifying-glass", styles.icon].join(' ')}></i></label>
                    <input 
                    name='searchBarNeww' 
                    id='searchBarNew' 
                    className={styles.searchInput} 
                    type="text" 
                    placeholder='Search'
                    autoComplete='false'
                    autoCorrect='false'
                    role='presentation'
                    value={searchBarValue}
                    onChange={onSearchChangeHandler}
                    onFocus={showSearch}
                    onBlur={hideSearch} />
                    <SearchResults
                    showSearchResults={showSearchResults}
                    users={searchResults}
                    ></SearchResults>
                    </form>

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