import { Movie } from "../../../domain/entities/Movie";
import { InMemoryMovieRepository } from "../../../infra/repositories/InMemoryMovieRepository";
import { UpdateMovie } from "./update-movie.usecase";


describe('Update Movie Usecase', () => {

    const repository = new InMemoryMovieRepository();
    const updateMovie = new UpdateMovie(repository);


    beforeAll(async () => {
        const movie = new Movie({ title: 'Filme 1', synopsis: 'O filme 1 é legal' })
        await repository.create(movie);
    });
    
    it('should update a movie', async () => {
        
        const inputMovie = { 
            id: 'abcdef123456', 
            title: 'Filme 2: Updated',
            synopsis: 'Filme 1 só que mais legal'
        }
        
        await updateMovie.execute(inputMovie);
        const movie = await repository.get(inputMovie.id);

        expect(movie).toEqual(inputMovie);

    });

    it('not should find the movie', async () => {

        const inputMovie = { 
            id: '132', 
            title: 'Filme 2: Updated',
            synopsis: 'Filme 1 só que mais legal'
        }

        try {
            await updateMovie.execute(inputMovie);
        } catch (error) {
            expect(error).toMatch('Movie not found.')
        }
    });
});