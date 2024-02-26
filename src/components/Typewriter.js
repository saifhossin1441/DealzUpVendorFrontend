import React, { useEffect, useState, useMemo } from 'react';
import './css/styles.css'; 

const Typewriter = () => {
  // Use useMemo to memoize the textArray
  const textArray = useMemo(() => [
    "Save Money..",
    "Earn Money..",
    "Search Flyers..",
    "Search Deals.. "
    // Add more strings as needed
  ], []);

  // Initialize state variables
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Function to handle typing animation
    const typeJs = () => {
      if (stringIndex < textArray.length) {
        const currentString = textArray[stringIndex];

        if (isTyping) {
          if (charIndex < currentString.length) {
            setCharIndex((prevCharIndex) => prevCharIndex + 1);
          } else {
            setIsTyping(false);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prevCharIndex) => prevCharIndex - 1);
          } else {
            setIsTyping(true);
            setStringIndex((prevStringIndex) =>
              prevStringIndex === textArray.length - 1 ? 0 : prevStringIndex + 1
            );
            setCharIndex(0);
          }
        }
      }
    };

    // Set an interval to call the typeJs function
    const intervalId = setInterval(typeJs, 100);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [stringIndex, charIndex, isTyping, textArray]);

  return <div className="animatedText">{textArray[stringIndex].substring(0, charIndex)}</div>;
};

export default Typewriter;
