import './Graph.css';
import { useState } from 'react';

function Graph({moodData}) {

  const [selectedEntry, setSelectedEntry] = useState(null);

  const getEntryForDate = (date) => moodData.find(entry => entry.date === date);


  // Sort moodData by date ascending
  const sortedData = [...moodData].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Get the most recent date in the data
  const mostRecentDate = sortedData.length > 0
    ? new Date(sortedData[sortedData.length - 1].date)
    : new Date();

  // Generate the 30 most recent dates (ending with the latest mood entry)
  const last30Days = [];
  for (let   i = 29; i >= 0; i--) {
    const d = new Date(mostRecentDate);
    d.setDate(d.getDate() - i);
    last30Days.push(d.toISOString().split('T')[0]);
  }

  const getMoodForDate = (date) => {
    const found = moodData.find(entry => entry.date === date);
    console.log("moodData", moodData);
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
      {!selectedEntry ? (
        <>
          <h1>Last 30 Entries</h1>
          <p style={{marginBottom: '1rem'}}>*Click Cell to View Entry*</p>
          <div className='heatmap-container'>
            {last30Days.map(date => {
              const entry = getEntryForDate(date);
              const mood = entry?.mood ?? null;
              const emoji = moodsval[mood];
              const [year, month, day] = date.split('-');
              const formattedDate = `${month}/${day}`;
              return (
                <div className='heatmap-item' key={date} 
                    onClick={() => entry && setSelectedEntry(entry)}>
                  <div
                    className='heatmap-cell'
                    style={{backgroundColor: getColorForMood(mood)}}
                  >
                    <div className='heatmap-overlay' onClick={(e) => e.stopPropagation()}>
                      <p>{formattedDate}</p>
                    </div>
                    <div>
                      {emoji}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className='note-popup'>
          <h2>{selectedEntry.date}</h2>
          <div style={{ fontSize: '2rem' }}>{moodsval[selectedEntry.mood]}</div>
          <p>{selectedEntry.note || 'No note provided.'}</p>
          <button className='close-btn' onClick={() => setSelectedEntry(null)}>BACK</button>
        </div>
      )}
    </div>
  );
}

export default Graph;
