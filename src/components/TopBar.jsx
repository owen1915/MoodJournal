import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // 👈 import signOut
import './TopBar.css';

function TopBar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const ref = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // 👈 sign out the user
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar-content'>
        <h2>Welcome: {username}</h2>
        <button className='logout-btn' onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;
