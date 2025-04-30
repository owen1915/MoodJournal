import { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import TrackContainer from './components/TrackContainer';

function App() {
  const [user, setUser] = useState(null); // stores the currently logged in user

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // set user when authenticated
    });

    // cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // show main app if logged in, otherwise show login page
  if (user) {
    return <TrackContainer />;
  } else {
    return <Login />;
  }
}

export default App;
