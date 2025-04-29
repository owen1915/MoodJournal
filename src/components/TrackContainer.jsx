import Tracker from './Tracker';
import TopBar from './TopBar';
import './TrackContainer.css'
import Graph from './Graph';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function TrackContainer() {
    const [moodData, setMoodData] = useState([]);

    const fetchMoods = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const today = new Date();
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(today.getDate() - 9);

        const q = query(
        collection(db, 'moods'),
        where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        const moods = [];

        querySnapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.date) {
            const moodDate = new Date(data.date);
            if (moodDate >= tenDaysAgo && moodDate <= today) {
            moods.push({
                date: data.date,
                mood: data.mood
            });
            }
        }
        });

        setMoodData(moods);
    };

    useEffect(() => {
        fetchMoods();
    }, []);
    
    return (
        <div className='container'>
            <TopBar />
            <Tracker refreshMoods={fetchMoods}/>
            <Graph moodData={moodData}/>
        </div>
    )
}

export default TrackContainer;