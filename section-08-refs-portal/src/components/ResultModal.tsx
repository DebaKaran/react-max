interface ResultModalProps {
  result: string
  targetTime: number
}

const ResultModal = ({result, targetTime}: ResultModalProps) => {
  return (
    <dialog className='result-modal' open>
        <h2>You {result}</h2>
        <p>Your target time was {targetTime} seconds.</p>
        <p>You stopped the timer with <strong>X times left</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
  )
}

export default ResultModal