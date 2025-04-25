import { useState, useEffect } from 'react';
import './App.css';
import Info from './components/Info';
import Tracker from './components/Tracker';
import { db, auth } from './firebase';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import AuthForm from './components/AuthForm';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const ref = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // clean up the listener
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return <AuthForm />; // 👈 show login/signup screen if not logged in
    }
    
  return (
    <div className="app">
      <div className="top-bar">
        <h1>logged in as {username}</h1>
        <button onClick={() => signOut(auth)}>log out</button>
      </div>
      <div className="header">
        <h1>MoodJournal</h1>
        <h5>by Owen Goodman</h5>
      </div>
      <div className="component-box">
        {<Info header="About MoodJournal" para="MoodJournal is a personal and intuitive web app designed to 
        help you track your daily emotions. Whether you're feeling great, struggling, or just somewhere in 
        between, MoodJournal provides a simple way to log your mood and reflect on your emotional journey over time."/>}

        {<Info header="Why use MoodJournal" para="Taking just a moment each day to check in with yourself can 
        make a huge difference. MoodJournal helps you build emotional awareness, identify patterns, and gain 
        insights into what affects your mental well-being. It’s a safe, private space to express how you feel—no pressure, just clarity."/>}

        {<Info header="About the Creator" para="Hey, I’m Owen Goodman. I created MoodJournal as a personal project 
        to combine my interest in mental health and web development. I’m currently a student passionate about building 
        simple, helpful tools that make a positive impact. Thanks for checking out my work!"/>}
      </div>
      <Tracker />
    </div>
  )
}

export default App;
