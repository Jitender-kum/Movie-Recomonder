import React from 'react';

const moods = [
  { name: 'Happy', emoji: '😂', color: '#FFD700' },
  { name: 'Sad', emoji: '😢', color: '#6495ED' },
  { name: 'Excited', emoji: '🔥', color: '#FF4500' },
  { name: 'Chill', emoji: '🥶', color: '#00CED1' },
  { name: 'Romantic', emoji: '😍', color: '#FF69B4' },
];

const MoodSelector = ({ onSelectMood }) => {
  return (
    <div style={{ textAlign: 'center', margin: '30px 0' }}>
      <h2 style={{ color: '#ddd' }}>How are you feeling today?</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onSelectMood(mood.name)}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              borderRadius: '25px',
              border: '2px solid ' + mood.color,
              backgroundColor: 'transparent',
              color: 'white',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            // Hover effect hum CSS mein daal sakte hain, abhi simple rakhte hain
            onMouseOver={(e) => e.target.style.backgroundColor = mood.color}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {mood.emoji} {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;