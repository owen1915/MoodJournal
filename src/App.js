import { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import { onAuthStateChanged} from 'firebase/auth';
import Login from './components/Login';
import TrackContainer from './components/TrackContainer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user) {
    return <TrackContainer />;
  } else {
    return <Login />
  }
  
}

export default App;
