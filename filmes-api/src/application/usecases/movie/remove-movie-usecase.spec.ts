import { Movie } from "../../../domain/entities/Movie";
import { InMemoryMovieRepository } from "../../../infra/repositories/InMemoryMovieRepository";
import { RemoveMovie } from "./remove-movie.usecase";

describe('Remove Movie Usecase', () => {

    const repository = new InMemoryMovieRepository();


    beforeAll(async () => {
        const movie = new Movie({ title: 'Filme 1', synopsis: 'O filme 1 é legal' })
        await repository.create(movie);
    });

    it('should remove the movie', async () => {
    
        const removeMovie = new RemoveMovie(repository);

        await removeMovie.execute('abcdef123456');

        expect(repository.movies).toHaveLength(0);
    });
});