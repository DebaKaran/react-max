import './App.css'
import SearchBar from './components/SearchBar'

function App() {

  //callback function
  const handleSubmit = (term: string) => {
    console.log(`Do a seach with ${term}`);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
    </>
  )
}

export default App
