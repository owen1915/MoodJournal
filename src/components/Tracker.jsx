import { db, auth } from '../firebase';
import { addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './Tracker.css';
import { query, collection, where, getDocs } from 'firebase/firestore';

function Tracker({ refreshMoods }) {
  const [selected, setSelected] = useState(null);
  const [entry, setEntry] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const moods = ['😭', '😢', '☹️', '😐', '🙂', '😀', '😁'];
  const moodsval = {'😭' : -3, '😢':-2, '☹️':-1, '😐':0, '🙂':1, '😀':2, '😁':3};

  

  const handleSubmit = async () => {
    const mood = moodsval[moods[selected]];
    const note = entry;
    const userId = auth.currentUser.uid;
    const today = new Date().toISOString().split('T')[0];
  
    try {
      await addDoc(collection(db, "moods"), {
        userId,
        mood,
        note,
        date: today
      });
  
      setSelected(null);
      setEntry('');
      setMessage('Mood submitted!');
      setAlreadySubmitted(true);
      setTimeout(() => setMessage(''), 2000);

      await refreshMoods();
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Failed to submit mood.');
      setTimeout(() => setMessage(''), 2000);
    }
  };  


  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const checkMoodSubmission = async () => {
      const userId = auth.currentUser.uid;
      const today = new Date().toISOString().split('T')[0];

      const q = query(
        collection(db, 'moods'),
        where('userId', '==', userId),
        where('date', '==', today)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setAlreadySubmitted(true);
      }
    };

    if (auth.currentUser) {
      checkMoodSubmission();
    }
  }, []);

  return (
    <>
      {!alreadySubmitted ? (
        <div className="tracker-box">
            <h1>Daily Mood Check-In</h1>
            <h4>Describe your feelings with an Emoji</h4>
            <div className="emoji-box">   
            {moods.map((emoji, index) => (
                <button key={index} className={`emoji-btn ${selected === index ? 'active' : ''}`} onClick={() => setSelected(index)}>
                    {emoji}
                </button>
            ))}
            {message && <div className="toast">{message}</div>}
            </div>
            {selected !== null && (
            <textarea
              className="diary-entry"
              placeholder="Write why you feel this way..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          )}
          {entry !== '' && (
            <button onClick={handleSubmit}>
            Submit
          </button>
          )}
        </div>
      ) : (
        <div>
        </div>
      )}
    </>
  );
}

export default Tracker;