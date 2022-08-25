import { Movie } from "../../../domain/entities/Movie";
import { InMemoryMovieRepository } from "../../../infra/repositories/InMemoryMovieRepository";
import { CreateMovie } from "./create-movie.usecase";


describe('Create Movie Usecase', () => {
    
    it('should create a movie', async () => {
        const repository = new InMemoryMovieRepository();
        const createMovie = new CreateMovie(repository);
        const inputMovie = {
            id: '123',
            title: 'Filme',
            synopsis: 'Um dos filmes já feitos.'
        }

        const movie = new Movie(inputMovie, inputMovie.id); 
        await createMovie.execute(movie);

        expect(repository.movies).toHaveLength(1);
        expect(repository.movies[0]).toEqual(inputMovie);
    });
    it('should create a movie without id', async () => {
        const repository = new InMemoryMovieRepository();
        const createMovie = new CreateMovie(repository);
        const inputMovie = {
            title: 'Filme',
            synopsis: 'Um dos filmes já feitos.'
        }

        const movie = new Movie(inputMovie); 
        await createMovie.execute(movie);

        expect(repository.movies).toHaveLength(1);
        expect(repository.movies[0]).toEqual({...inputMovie, id: 'abcdef123456'});
    });
});