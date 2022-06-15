export type Business = {
    id: string;
    name: string;
    rating: number;
    price: string;
    category: string[];
    is_closed: boolean;
    url: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    image_url: string;
}
