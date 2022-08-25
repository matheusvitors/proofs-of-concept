import { Movie } from "../entities/Movie";


export interface MovieRepository {
    list(): Promise<Movie[]>;
    get(id: string): Promise<Movie | null>; 
    create(movie: Movie): Promise<void>;
    update(movie: Movie): Promise<void>;
    remove(id: string): Promise<void>; 
}