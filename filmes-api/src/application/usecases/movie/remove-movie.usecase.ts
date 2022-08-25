import { MovieRepository } from "../../../domain/repositories/movie.repository";


export class RemoveMovie { 

    private movieRepository: MovieRepository;

    constructor(movieRepo: MovieRepository) {
        this.movieRepository = movieRepo;
    }

    async execute(id: string) {
        await this.movieRepository.remove(id);
    }
}