import { Movie } from "./Movie";


describe('Movie Class', () => {
    it('should generate a movie ', () => {

        const movieInput = {
            title: 'Filme',
            synopsis: 'Este foi um dos filmes ja feitos'
        }

        const movie = new Movie(movieInput, '1');

        expect(movie).toEqual({
            id: '1',
            title: 'Filme',
            synopsis: 'Este foi um dos filmes ja feitos'
        })
    });

    it('should generate a movie without send id', () => {
        const movieInput = {
            title: 'Filme',
            synopsis: 'Este foi um dos filmes ja feitos'
        }

        const movie = new Movie(movieInput);

        expect(movie).toEqual({
            id: 'abcdef123456',
            title: 'Filme',
            synopsis: 'Este foi um dos filmes ja feitos'
        })

    });
});