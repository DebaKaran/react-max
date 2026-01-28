import { useState } from "react";

const Player = () => {
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;  
    setName(inputValue);
  }

  const handleOnClick = () => {
    setSubmitted(name.trim() !== '' );
  }

  const displayName = submitted ? name : "unknown entity";
  
  return (
    <section>
      <h2>Welcome {displayName}</h2>
      <p>
        <input type="text" onChange={handleChange} value={name}/>
        <button onClick={handleOnClick}>Set Player Name</button>
      </p>
      
    </section>
  )
}

export default Player;