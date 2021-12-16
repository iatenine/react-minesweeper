import {useState, React} from 'react'

export const Game = () => {
    // State includes: score, time, gameState
    // gameState can be 'playing', 'lost' or 'won'

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);


    return (
        <div>
            
        </div>
    )
}

export default Game;