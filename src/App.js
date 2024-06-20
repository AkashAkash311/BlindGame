import React, { useEffect, useRef, useState } from 'react'
const Blocks = 5;

const App = () => {

  let interval = useRef(null);
  // const[score,Setscore] = useState(0);
  const[highscore,Sethighscore] = useState(0);
  const[reqBlock, SetreqBlock] = useState((Math.random()*10) % Blocks);
  const[success, Setsuccess] = useState(null);
  const[failure, Setfaliure] = useState(null);

  let BlockElements = []
  for(let i=0; i<=Blocks; i++){
    BlockElements.push(
      <div
      key={i}
        className={` border border-green-500 w-1/5 
        ${i === reqBlock ?  "bg-blue-800" : ""} 
        ${i === success ? "bg-green-700" : ""} 
        ${i === failure ? "bg-red-700" : ""} block`}
       id={i}
      onClick={() => handlePress(i)}
      ></div>
    )

  }

  useEffect(() =>{
    if(localStorage.getItem("highscore") < highscore){
      localStorage.setItem("highscore", highscore);
    }
  },[highscore]);

  const handlePress = (index)=>{
    if(index === reqBlock){
      Sethighscore((prev)=>prev+1);
      Setsuccess(index);
    } else{
      Setfaliure(index);
      Sethighscore((prev)=>prev-1);
    }
  }

  // useEffect(() => {
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  
  function ClickHandler(){
    interval.current = setInterval(() => {
      const random = parseInt((Math.random() * 10) % Blocks);
      SetreqBlock(random);
      Setsuccess(null);
      Setfaliure(null);
      console.log(random);
    }, 1000);
  }

  function EndHandler(){
    // console.log(interval.current);
    clearInterval(interval.current);
    // console.log(interval);
    interval.current = null
    // alert("Game Over");

  }

  return (
    <>
      <div className=' m-auto mt-3 font-semibold text-[50px]'>Blink Game</div>
      <div className='flex flex-col m-auto justify-between w-7/12 font-semibold text-[20px]'>
      <div className=' flex justify-between'>
        <div>
        Score: {highscore}
        </div>
        <div>
        HighScore: {localStorage.getItem("highscore")|| 0}
        </div>
      </div>
      <div className=' w-full h-28 border-2 border-solid flex'>
       {BlockElements}
       
      </div>

        <button onClick={ClickHandler}>Start</button>
        <button onClick={EndHandler}>End</button>
      </div>

    </>
  )
}

export default App;
