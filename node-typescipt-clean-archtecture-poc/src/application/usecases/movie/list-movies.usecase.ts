import { MovieRepository } from "../../../domain/repositories/movie.repository";


export class ListMovies { 

    private movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) { 
        this.movieRepository = movieRepository;
    }

    async execute() {
        return await this.movieRepository.list();
    }
}