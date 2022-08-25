import { Movie } from "../../../domain/entities/Movie";
import { MovieRepository } from "../../../domain/repositories/movie.repository";


export class UpdateMovie {

    private movieRepository: MovieRepository;

    constructor(movieRepo: MovieRepository){
        this.movieRepository = movieRepo;
    }

    async execute(movie: Movie): Promise<void> {

        try {
            await this.movieRepository.update(movie);
        } catch (error) {
            throw new Error('Movie not found.');
        }
    }
}