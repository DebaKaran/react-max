import type React from "react";
import type { UnsplashImage } from "../api";
import ImageShow from "./ImageShow";

interface ImageListProps {
    images: UnsplashImage[];
}
const ImageList: React.FC<ImageListProps> = ({ images }) => {
    const renderedImages = images.map(image => {
        return <ImageShow key={image.id} image={image} />
    })
    return (
        <div>
            {renderedImages}
        </div>
    )
}

export default ImageList