export interface PlaceImage {
  src: string;
  alt: string;
}

export interface Place {
  id: string;
  title: string;
  image: PlaceImage;
  lat: number;
  lon: number;
}