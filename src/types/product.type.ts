export type Product = {
    id: number;
    title: string;
    artist: string;
    genre?: string;
    releaseYear?: number;
    label?: string;
    price: number;
    stock: number;
    coverUrl?: string;
    description?: string;
}