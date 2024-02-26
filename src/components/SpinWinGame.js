import React, { useState } from 'react';

const SpinWinGame = () => {
  const prizes = ['Prize 1', 'Prize 2', 'Prize 3', 'No Luck', 'Try Again', 'Bonus Prize'];
  const [isSpinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (!isSpinning) {
      setSpinning(true);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setResult(prizes[randomIndex]);
        setSpinning(false);
      }, 2000); 
    }
  };

  return (
    <>
    <div>
      <h1>Spin & Win Game</h1>
      <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
       
       <svg width="100" height="100">
        <circle cx="50" cy="50" r="45" stroke='black' strokeWidth="5" fill="white"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="black" strokeWidth="3"/>
        <line x1="50" y1="10" x2="45" y2="20" stroke="black" strokeWidth="3" />
          <line x1="50" y1="10" x2="55" y2="20" stroke="black" strokeWidth="3" />



       </svg>
      </div>
      <button onClick={spinWheel} disabled={isSpinning}>
        Spin
      </button>
      {result && <p>You won: {result}</p>}
    </div>
    </>
  );
};

export default SpinWinGame;