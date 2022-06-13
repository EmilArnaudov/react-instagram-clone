import './App.css';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewsFeed from './components/NewsFeed/NewsFeed';
import UserProfile from './components/UserProfile/UserProfile';
import PostDetails from './components/PostDetails/PostDetails';

import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, doc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import PostDetailsModal from './components/PostDetailsModal/PostDetailsModal';
import Chat from './components/Chat/Chat';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export let CurrentUserContext = createContext();
export let FirebaseContext = createContext();

function App() {

  let [user, setUser] = useState(null);
  let [userData, setUserData] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  })

  useEffect(() => {
    if (user && (!userData || user.email !== userData.email)) {
      const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
        setUserData(doc.data())
      });

      return unsub;
    }
  }, [user, userData])

  return (
    <div className="App">
      <FirebaseContext.Provider value={{db, auth, storage}}>
        <CurrentUserContext.Provider value={{user, userData}}>
          <Router>
              <Routes>
                <Route path='/' element={<NewsFeed/>}></Route>
                <Route path='/sign-in' element={<SignIn/>}></Route>
                <Route path='/sign-up' element={<SignUp/>}></Route>
                <Route path='/messages' element={<Chat/>}></Route>
                <Route path='/:username' element={<UserProfile/>}></Route>
                <Route path='/p/:postId'element={<PostDetails/>} ></Route>
                <Route path='/pm/:postId'element={<PostDetailsModal/>} ></Route>
              </Routes>
          </Router>
        </CurrentUserContext.Provider>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
