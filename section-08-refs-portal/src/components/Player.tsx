import { useRef, useState } from "react";

/**
 * DESIGN NOTE:
 * This component uses `useRef` instead of `useState` for the input value
 * because the user's typing does not need to trigger re-renders.
 *
 * Key ideas:
 * - The input value is only required when the user clicks "Set Player Name".
 * - Storing the input value in state would cause unnecessary re-renders
 *   on every keystroke without affecting the UI.
 * - `useRef` allows reading the input value imperatively on demand
 *   while keeping React reactivity limited to actual UI changes.
 *
 * State is used only for the confirmed player name, which directly
 * affects rendering.
 *
 * Rule of thumb:
 * Use state for values that should trigger re-renders.
 * Use refs for values that should be read, not reacted to.
 */

const Player = () => {
  const [name, setName] = useState<string>('');
  
  const playerName = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    const enteredName = playerName.current?.value.trim() || '';
    setName(enteredName);
  }

  const displayName = name.trim() !== '' ? name : "unknown entity"

  return (
    <section>
      <h2>Welcome {displayName}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleOnClick}>Set Player Name</button>
      </p>
      
    </section>
  )
}

export default Player;