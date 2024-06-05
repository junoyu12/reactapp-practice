import React from 'react';

const TextDisplay = ({ text }) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap', border: '1px solid black', padding: '10px', margin: '10px' }}>
      {text}
    </div>
  );
};

export default TextDisplay;
