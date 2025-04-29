import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Graph.css';

function Graph({moodData}) {

  // generate list of last 10 days
  const last10Days = [];
  for (let i = 9; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last10Days.push(d.toISOString().split('T')[0]); // 'YYYY-MM-DD'
  }

  const getMoodForDate = (date) => {
    const found = moodData.find(entry => entry.date === date);
    return found ? found.mood : null;
  };

  const moodsval = {
    "-3": '😭',
    "-2": '😢',
    "-1": '☹️',
     "0": '😐',
     "1": '🙂',
     "2": '😀',
     "3": '😁'
  };

  const getColorForMood = (mood) => {
    if (mood === null) return '#ccc'; // no data = grey
    if (mood === 0) return '#ffffC5'; // 0 = yellow
    if (mood === -3) return '#8b0000'; // very bad = red
    if (mood === -2) return '#ff4d4d'; // somewhat bad = light red
    if (mood === -1) return '#ff7074'; // neutral
    if (mood === 1) return '#d0ffbc'; // good = green
    if (mood === 2) return '#90ee90'; // great = green
    if (mood === 3) return '#228b22'; // amazing = green
  };

  return (
    <div className='graph-container'>
      <h1>Trends</h1>
      <div className='heatmap-container'>
        {last10Days.map(date => {
          const mood = getMoodForDate(date);
          const emoji = moodsval[mood]
          return (
            <div
              key={date}
              className='heatmap-cell'
              style={{ backgroundColor: getColorForMood(mood) }}
              title={date}
            >
              {emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Graph;
