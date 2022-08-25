import { Movie } from "../../domain/entities/Movie";
import { MovieRepository } from "../../domain/repositories/movie.repository";


export class InMemoryMovieRepository implements MovieRepository {

    public movies: Movie[];

    constructor() { 
        this.movies = []
    }

    async list(): Promise<Movie[]> {
        return this.movies;
    }

    async get(id: string): Promise< Movie | null > {
        const movie = this.movies.find(movie => movie.id === id);
        return movie ? movie : null;
    }

    async create(movie: Movie): Promise<void> {
        this.movies.push(movie);
    }

    async update(movie: Movie): Promise<void> {
        try {
            const movieIndex = this.movies.findIndex(mo => mo.id === movie.id);
            this.movies[movieIndex] = movie;
        } catch (error) {
            throw new Error('Movie not found');
        }
    }

    async remove(id: string): Promise<void> {
        this.movies = this.movies.filter(mo => mo.id !== id);
    }

}