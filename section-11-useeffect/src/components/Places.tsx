import type { Place } from '../types/place';

interface PlacesProps {
  title: string;
  places: Place[];
  fallbackText?: string;
  onSelectPlace: (id: string) => void;
}

export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
}: PlacesProps) {

  const renderPlaceItem = (
    place: Place
  ) => {
    return (
      <li key={place.id} className="place-item">
      <button onClick={() => onSelectPlace(place.id)}>
        <img src={place.image.src} alt={place.image.alt} />
        <h3>{place.title}</h3>
      </button>
    </li>
  );
}

  return (
    <section className="places-category">
      <h2>{title}</h2>

      {places.length === 0 && fallbackText && (
        <p className="fallback-text">{fallbackText}</p>
      )}

      {places.length > 0 && (
        <ul className="places">
          {places.map(place => renderPlaceItem(place))}
        </ul>
      )}
    </section>
  );
}