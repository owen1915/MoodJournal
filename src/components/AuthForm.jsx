// src/components/AuthForm.jsx
import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './AuthForm.css';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save username to Firestore under users collection
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='wrapper'>
        <span>
            <form onSubmit={handleSubmit}>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <div className='questions'>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {!isLogin && (<input 
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
                {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </p>
            </form>
        </span>
    </div>
  );
}

export default AuthForm;
