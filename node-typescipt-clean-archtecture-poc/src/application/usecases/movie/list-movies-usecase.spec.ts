import { Movie } from "../../../domain/entities/Movie";
import { InMemoryMovieRepository } from "../../../infra/repositories/InMemoryMovieRepository";
import { ListMovies } from "./list-movies.usecase";

describe('List Movie Usecase', () => {
    it('should list movies', async () => {

        const repository = new InMemoryMovieRepository();

        const movieInput = new Movie({
            title: 'Filme',
            synopsis: 'Este foi um dos filmes ja feitos'
        }, '123');

        await repository.create(movieInput)
        
        const listMovies = new ListMovies(repository);
        const movies = await listMovies.execute();

        expect(movies).toHaveLength(1);
        expect(movies[0]).toEqual(movieInput);
        
    });
});