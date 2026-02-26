import { forwardRef } from "react";

interface ResultModalProps {
  result: string;
  targetTime: number;
}

const ResultModal = forwardRef<HTMLDialogElement, ResultModalProps>(
  ({ result, targetTime }, ref) => {
    return (
      <dialog ref={ref} className="result-modal">
        <h2>You {result}</h2>
        <p>
          Your target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>You stopped the timer with <strong>X times left</strong></p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

export default ResultModal;