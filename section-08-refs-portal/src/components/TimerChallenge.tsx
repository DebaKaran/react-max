import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

interface TimerChallengeProps {
    title: string;
    targetTime: number; // in seconds
}

const TimerChallenge = ({title, targetTime}: TimerChallengeProps) => {

 const [timerExpired, setTimerExpired] = useState(false);
 const [timerStarted, setTimerStarted] = useState(false);
  
 const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
 
  const handleStart = () => {
    setTimerExpired(false);
    setTimerStarted(true);
    timerId.current = setTimeout(() => {
        setTimerExpired(true);
        setTimerStarted(false);
    }, targetTime * 1000);
    
  }

  const handleStop = () => {
    if(timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
    }
    setTimerStarted(false);
  }
  return (
    <>
      {timerExpired && <ResultModal result="lost" targetTime={targetTime} />}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s": ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
              {timerStarted ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running…" : "Timer inactive"}
        </p>
      </section>
    </>
  )
}

export default TimerChallenge