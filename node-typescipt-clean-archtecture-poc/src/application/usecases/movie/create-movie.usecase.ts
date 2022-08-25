import { Movie } from "../../../domain/entities/Movie";
import { MovieRepository } from "../../../domain/repositories/movie.repository";


export class CreateMovie { 

    private movieRepository: MovieRepository;

    constructor(movieRepo: MovieRepository){
        this.movieRepository = movieRepo;
    }

    async execute(movie: Movie): Promise<void> {
        return await this.movieRepository.create(movie);
    }

}