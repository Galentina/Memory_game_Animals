import React, {useState} from 'react';
// import ImageBoxes from './imageBoxes';
import Deer from './images/Deer.png'
import Dog from './images/Dog.png'
import Dragon from './images/Dragon.png'
import Fish from './images/Fish.png'
import Kat from './images/Kat.png'
import Monkey from './images/Monkey.png'
import Monster from './images/Monster.png'
import Octopus from './images/Octopus.png'
import Question from './images/Question.png'
import Umbrella from './images/Umbrella.png'
import Back from './images/Back.png'
import {v4 as uuid4v} from 'uuid';
import './App.css';

function App() {
    const [guessImage, setGuessImage] = useState([
        {id: uuid4v(), image: Deer, back: Back, state: 0}, {id: uuid4v(), image: Dog, back: Back, state: 0},
        {id: uuid4v(), image: Dragon, back: Back, state: 0}, {id: uuid4v(), image: Fish, back: Back, state: 0},
        {id: uuid4v(), image: Kat, back: Back, state: 0}, {id: uuid4v(), image: Monkey, back: Back, state: 0},
        {id: uuid4v(), image: Monster, back: Back, state: 0}, {id: uuid4v(), image: Octopus, back: Back, state: 0},
        {id: uuid4v(), image: Question, back: Back, state: 0}, {id: uuid4v(), image: Umbrella, back: Back, state: 0},
        {id: uuid4v(), image: Deer, back: Back, state: 0}, {id: uuid4v(), image: Dog, back: Back, state: 0},
        {id: uuid4v(), image: Dragon, back: Back, state: 0}, {id: uuid4v(), image: Fish, back: Back, state: 0},
        {id: uuid4v(), image: Kat, back: Back, state: 0}, {id: uuid4v(), image: Monkey, back: Back, state: 0},
        {id: uuid4v(), image: Monster, back: Back, state: 0}, {id: uuid4v(), image: Octopus, back: Back, state: 0},
        {id: uuid4v(), image: Question, back: Back, state: 0}, {id: uuid4v(), image: Umbrella, back: Back, state: 0},
    ]);

    const [step, setStep] = useState(0);

    const imagesRandom = () => {
        const newGuessImage = [...guessImage].sort(() => Math.random() - 0.5);
        newGuessImage.map(el =>el.back= Back);
        newGuessImage.map(el => el.state=0);
        setGuessImage(newGuessImage);
        setStep(0);
        console.log(newGuessImage);
    }

    const changeBg = (id)=> {
        let newStep = step;
        const newGuessImage = [...guessImage];
        newGuessImage.map(el => {
            if (el.id === id) el.back = el.image;
            return el;
        })
        setGuessImage(newGuessImage);
        setStep(newStep+1);
        if (newStep+1 >1) {
            skm_LockScreen()
            setTimeout(checkUp, 500);
        }
        console.log(step);
    }

    function skm_LockScreen(){
        let lock = document.getElementById('skm_LockPane');
        if (lock)
            lock.className = 'LockOn';
        setTimeout( skm_UnlockScreen, 700);
    }

    function skm_UnlockScreen() {
        let lock = document.getElementById('skm_LockPane');
        if (lock)
            lock.className = 'LockOff';
    }

    const checkUp = () => {
        const newGuessImage = [...guessImage];
        const newGuessImage1 = guessImage.filter(el => ( el.back !== Back && el.state === 0));
        console.log(newGuessImage1)
        if (newGuessImage1[0].state === 0 && newGuessImage1[1].state === 0) {
            if (newGuessImage1[0].image !== newGuessImage1[1].image) {
                setStep(0);
                newGuessImage1.every(el => el.back = Back);
            } else if (newGuessImage1[0].image === newGuessImage1[1].image) {
                newGuessImage.map(el => (el.id === newGuessImage1[0].id) ? el.state = 1 : {...el});
                newGuessImage.map(el => (el.id === newGuessImage1[1].id) ? el.state = 1 : {...el});
                setStep(0);

                }
            }
            setGuessImage(newGuessImage);
        if(isGameOver()) {
            alert("You did it! Do you want to do it again - click to START!");
        }
        }

    const isGameOver = () => {
        return guessImage.filter(el => (el.state === 0)).length === 0;
    }

  return (
    <div className="App">
      <header className="App-header">Memory</header>
        <button className='button1' onClick={imagesRandom}>Start</button>
      <div className='mainDiv'>

          {guessImage.map(el => <button disabled={el.state ===1 } className='imageDiv' onClick={() =>changeBg(el.id)} style={{background: `url(${el.back})`}}>{' '}</button>
          )

          } <div id="skm_LockPane" className="LockOff"> {' '}</div>

      </div>
    </div>
  );
}

export default App;
