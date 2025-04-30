import Tracker from './Tracker';
import TopBar from './TopBar';
import './TrackContainer.css'
import Graph from './Graph';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import PieCharts from './PieCharts';
import Advice from './Advice';
import InfoRow from './InfoRow';

function TrackContainer() {
    const [moodData, setMoodData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshMoods = () => {
        setRefreshKey(prev => prev + 1);
    };

    const fetchMoods = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        
        const q = query(
            collection(db, 'moods'),
            where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(q);
        const moods = [];
        
        querySnapshot.forEach(docSnap => {
            const data = docSnap.data();
            if (data.date) {
            moods.push({
                date: data.date,
                mood: data.mood,
                note: data.note,
                advice: data.advice
            });
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
            <div className='two-container'>
                <Tracker refreshMoods={fetchMoods} refreshKey={refreshMoods}/>
                <Graph moodData={moodData}/>
            </div>
            <div className='two-container'>
                <PieCharts moodData={moodData}/>
                <Advice refreshKey={refreshKey} moodData={moodData}/>
            </div>
            <InfoRow />
        </div>
    )
}

export default TrackContainer;