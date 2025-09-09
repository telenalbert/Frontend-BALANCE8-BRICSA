import React, { useEffect } from 'react';

const colors = ['#7BA4DB', '#CB333B', '#ECA154', '#004976', '#A2AAAD', '#888B8D'];

const RandomSquaresBackground = () => {
  useEffect(() => {
    const randomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    const createSquare = (position) => {
      const square = document.createElement('div');
      square.classList.add('square');

      
      switch (position) {
        case 'top-left':
          square.style.top = `${Math.random() * 100}px`;
          square.style.left = `${Math.random() * 100}px`;
          break;
        case 'top-right':
          square.style.top = `${Math.random() * 100}px`;
          square.style.right = `${Math.random() * 100}px`;
          break;
        case 'bottom-left':
          square.style.bottom = `${Math.random() * 100}px`;
          square.style.left = `${Math.random() * 100}px`;
          break;
        case 'bottom-right':
          square.style.bottom = `${Math.random() * 100}px`;
          square.style.right = `${Math.random() * 100}px`;
          break;
        default:
          break;
      }

      square.style.backgroundColor = randomColor();

      document.body.appendChild(square);

      return square;
    };

    const squares = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const createdSquares = squares.map(position => createSquare(position));

    return () => {
      createdSquares.forEach(square => square.remove());
    };
  }, []);

  return null; 
};

export default RandomSquaresBackground;