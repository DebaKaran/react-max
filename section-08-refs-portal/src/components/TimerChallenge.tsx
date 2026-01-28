import { useState } from "react";

interface TimerChallengeProps {
    title: string;
    targetTime: number; // in seconds
}

const TimerChallenge = ({title, targetTime}: TimerChallengeProps) => {

 const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  
  const handleStart = () => {
    setTimerStarted(true);
    setTimeout(() => {
        setTimerExpired(true);
        setTimerStarted(false);
    }, targetTime * 1000);
  }
  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p className="challenge-complete">lost the challenge</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s": ""}
      </p>
      <p>
        <button onClick={handleStart}>
            {timerStarted ? "Stop Challenge" : "Start Challenge"}
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "Time is running…" : "Timer inactive"}
      </p>
    </section>
  )
}

export default TimerChallenge