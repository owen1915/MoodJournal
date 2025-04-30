import './Advice.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

function Advice({ refreshKey }) {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);
  const [adviceGiven, setAdviceGiven] = useState(false);

  const moodsval = {
    "-3": 'very overwhelmed 😭',
    "-2": 'down 😢',
    "-1": 'low ☹️',
    "0": 'neutral 😐',
    "1": 'okay 🙂',
    "2": 'happy 😀',
    "3": 'amazing 😁'
  };

  const getTodayMood = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
  
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
    const q = query(
      collection(db, 'moods'),
      where('userId', '==', userId),
      where('date', '==', today)
    );
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const entry = docSnap.data();
        setMood(moodsval[entry.mood.toString()]);
        setNote(entry.note);
        
        const rawMood = entry.mood;
        const rawNote = entry.note;
        const docId = docSnap.id;


        if (entry.advice) {
        setTip(entry.advice);
        setAdviceGiven(true);
        } else {
        // Automatically fetch advice if it hasn't been given yet
        getAdvice(rawMood, rawNote, docId); // only calls once because this effect runs once on load or refreshKey
        }
    }
  };  
  

  const getAdvice = async (rawMood, rawNote, docId) => {
    if (!rawMood || !rawNote || !docId) return;
  
    setLoading(true);
    setTip('');
  
    try {
      const moodText = moodsval[rawMood.toString()];
  
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `I'm feeling ${moodText}. Give me one helpful tip to feel better. I'm feeling this way because: ${rawNote}`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
  
      const reply = res.data.choices[0].message.content;
      setTip(reply);
      setAdviceGiven(true);
  
      // Save to Firestore
      const docRef = doc(db, 'moods', docId);
      await updateDoc(docRef, { advice: reply });
    } catch (err) {
      console.error('Error fetching advice:', err);
      setTip('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodayMood();
  }, [refreshKey]);

  return (
    <div className="graph-container-advice">
      <h1>Advice from AI</h1>
  
      {mood ? (
        <div className="advice-box">{tip}</div>
      ) : (
        <p>No mood found for today. Submit one to get advice.</p>
      )}
  
      {loading && <h3 style={{fontWeight: 'bold'}}>Loading...</h3>}
    </div>
  );  
}

export default Advice;
