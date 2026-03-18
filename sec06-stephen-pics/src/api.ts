import axios from "axios"

interface UnsplashImage {
    id: string;
    alt_description: string;
    urls: {
        small: string;
        regular: string;
    };
}

interface UnsplashResponse {
    results: UnsplashImage[];
}

const searchImages = async (searchTerm: string): Promise<UnsplashImage[]> => {
    try {
        const response = await axios.get<UnsplashResponse>('https://api.unsplash.com/search/photos', {
            headers: {
                Authorization: 'Client-ID WrOgk2HBj6MU49uwU9JZNXg4en2xmt4vq08TntSB0ak'
            },
            params: {
                query: searchTerm
            }
        });
        console.log(response.data.results);
        return response.data.results;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        return []; // safe fallback
    }
};

export default searchImages;