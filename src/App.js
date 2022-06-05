import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewsFeed from './components/NewsFeed/NewsFeed';
import UserProfile from './components/UserProfile/UserProfile';

import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, createContext } from 'react';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export let CurrentUserContext = createContext();
export let FirebaseContext = createContext();

function App() {

  let [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  })

  return (
    <div className="App">
      <FirebaseContext.Provider value={{db, auth}}>
        <CurrentUserContext.Provider value={user}>
          <Router>
              <Routes>
                <Route path='/profile' element={<UserProfile/>}></Route>
                <Route path='/sign-in' element={<SignIn/>}></Route>
                <Route path='/sign-up' element={<SignUp/>}></Route>
                <Route path='/' element={<NewsFeed/>}></Route>
              </Routes>
          </Router>
        </CurrentUserContext.Provider>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
