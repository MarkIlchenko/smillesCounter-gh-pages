// Language: React.js

import React, { useState, useEffect } from 'react';

const EmoticonList = () => {
    const [emoticons, setEmoticons] = useState([]);
    
    useEffect(() => {
        const storedEmoticons = JSON.parse(localStorage.getItem('emoticons'));
        if (storedEmoticons) {
            setEmoticons(storedEmoticons);
        } else {
            const defaultEmoticons = [
                { id: 1, name: 'Grinning Face', count: 0 },
                { id: 2, name: 'Smiling Face with Sunglasses', count: 0 },
                { id: 3, name: 'Face with Rolling Eyes', count: 0 },
            ];
            setEmoticons(defaultEmoticons);
            localStorage.setItem('emoticons', JSON.stringify(defaultEmoticons));
        }
    }, []);
    
    const handleEmoticonClick = (id) => {
        const newEmoticons = emoticons.map((emoticon) => {
            if (emoticon.id === id) {
                return { ...emoticon, count: emoticon.count + 1 };
            }
            return emoticon;
        });
        localStorage.setItem('emoticons', JSON.stringify(newEmoticons));
        setEmoticons(newEmoticons);
    };
    
    const handleShowResultClick = () => {
        const maxCount = Math.max(...emoticons.map((emoticon) => emoticon.count));
        const winningEmoticons = emoticons.filter((emoticon) => emoticon.count === maxCount);
        
        // Checking if there are multiple emoticons with tied count
        if (winningEmoticons.length > 1) {
            alert('It is a tie between: ' + winningEmoticons.map(emoticon => emoticon.name).join(', '));
        } else {
            alert(`The winning emoticon is ${winningEmoticons[0].name}`);
        }
    };
    
    return (
         <div>
             <ul>
                 {emoticons.map((emoticon) => (
                      <li key={emoticon.id}>
                          {emoticon.name}{' '}
                          <button onClick={() => handleEmoticonClick(emoticon.id)}>
                              Vote
                          </button>{' '}
                          Count: {emoticon.count}
                      </li>
                 ))}
             </ul>
             <button onClick={handleShowResultClick}>Show Results</button>
         </div>
    );
};

export default EmoticonList;