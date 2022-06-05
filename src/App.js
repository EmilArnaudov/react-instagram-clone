import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewsFeed from './components/NewsFeed/NewsFeed';
import UserProfile from './components/UserProfile/UserProfile';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (

    <div className="App">
      <Router>
          <Routes>
            <Route path='/profile' element={<UserProfile/>}></Route>
            <Route path='/sign-in' element={<SignIn/>}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
            <Route path='/' element={<NewsFeed/>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
