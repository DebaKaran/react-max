import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

interface TimerChallengeProps {
  title: string;
  targetTime: number; // in seconds
}

const TimerChallenge = ({ title, targetTime }: TimerChallengeProps) => {
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialog = useRef<HTMLDialogElement | null>(null);

  const handleClick = () => {
    setTimerStarted(true);
    timerId.current = setTimeout(() => {
      setTimerExpired(true);
      setTimerStarted(false);
      dialog.current!.showModal();
    }, targetTime * 1000);

  }

  const handleStop = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    //setTimerExpired(false);
    setTimerStarted(false);
  }
  const timerDisplayStatus = timerStarted ? "Timer is running..." : 'Timer inactive';
  const startStopChallengeStatus = timerStarted ? "Stop " : "Start ";

  return (
    <>
      <ResultModal ref={dialog} result="you lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleClick}>
            {startStopChallengeStatus}Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerDisplayStatus}
        </p>
      </section>
    </>

  )
}

export default TimerChallenge