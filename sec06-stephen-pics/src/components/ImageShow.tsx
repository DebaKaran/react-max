import type React from "react"
import type { UnsplashImage } from "../api"

interface ImageShowProps {
    image: UnsplashImage
}
const ImageShow: React.FC<ImageShowProps> = ({ image }) => {
    return (
        <div>
            <img src={image.urls.small} alt={image.alt_description} />
        </div>
    )
}

export default ImageShow