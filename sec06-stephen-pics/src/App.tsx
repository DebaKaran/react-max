import { useState } from 'react';
import searchImages, { type UnsplashImage } from './api';
import './App.css'
import ImageList from './components/ImageList';
import SearchBar from './components/SearchBar'

function App() {

  const [images, setImages] = useState<UnsplashImage[]>([])
  //callback function
  const handleSubmit = async (term: string) => {
    console.log(`Do a seach with ${term}`);
    const result = await searchImages(term);

    setImages(result);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
    </>
  )
}

export default App
