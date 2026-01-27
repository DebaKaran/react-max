import { useRef, useState } from 'react';


import { AVAILABLE_PLACES } from './data/places';
import type { Place } from './types/place';

import logoImg from './assets/logo.png';
import Modal from './components/Modal';
import DeleteConfirmation from './components/DeleteConfirmation';
import Places from './components/Places';

function App() {
  const modal = useRef<{ open: () => void; close: () => void } | null>(null);
  const selectedPlaceId = useRef<string | null>(null);

  const [pickedPlaces, setPickedPlaces] = useState<Place[]>([]);

  function handleStartRemovePlace(id: string) {
    modal.current?.open();
    selectedPlaceId.current = id;
  }

  function handleStopRemovePlace() {
    modal.current?.close();
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }

      const place = AVAILABLE_PLACES.find((place) => place.id === id);

      if (!place) {
        return prevPickedPlaces;
      }

      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter(
        (place) => place.id !== selectedPlaceId.current
      )
    );

    modal.current?.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>

      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;