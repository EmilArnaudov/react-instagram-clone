import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <NewsFeed></NewsFeed>
      <Footer></Footer>
    </div>
  );
}

export default App;
