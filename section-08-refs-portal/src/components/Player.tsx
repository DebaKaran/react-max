import { useState } from "react";

const Player = () => {
  const [name, setName] = useState<string>('unknown entity');
   
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if(inputValue.trim() === '') {
      inputValue = 'unknown entity';
    }
    setName(inputValue);
  }
  
  return (
    <section>
      <h2>Welcome {name}</h2>
      <p>
        <input type="text" onChange={handleChange} />
        <button>Set Player Name</button>
      </p>
      
    </section>
  )
}

export default Player;