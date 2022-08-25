import { Router, Request, Response } from "express";
import { CreateMovie, ListMovies, UpdateMovie, RemoveMovie } from "../../application/usecases/movie";
import { Movie } from "../../domain/entities/Movie";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { InMemoryMovieRepository } from "../../infra/repositories/InMemoryMovieRepository";
import { Controller } from "../interfaces/Controller";


export class MovieController implements Controller{
    path: string;
    router: Router;

    private movieRepository: MovieRepository;

    constructor() {
        this.path = '/movies';
        this.router = Router();
        this.movieRepository = new InMemoryMovieRepository();

        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(this.path, this.list);
        this.router.post(this.path, this.save);
        console.log(this.router);
        
    }

    list = async (request: Request, response: Response) => {        
        try {
            const listMovies = new ListMovies(this.movieRepository);
            const movies = await listMovies.execute();
    
            return response.json({ movies })
        } catch (error) {
            return response.status(500).json({ error })
        }
    }

    save = async (request: Request, response: Response) => {

        const { title, synopsis } = request.body;

        try {
            const movie = new Movie({title, synopsis});
            const createMovie = new CreateMovie(this.movieRepository);
            await createMovie.execute(movie);
            
            return response.status(201).json({ message: "Filme adicionado!"});
        } catch (error) {
            return response.status(500).json({ error })
        }
    }

    edit = async (request: Request, response: Response) => {
        const { title, synopsis, id } = request.body;

        try {
            const movie = new Movie({title, synopsis}, id);
            const updateMovie = new UpdateMovie(this.movieRepository);
            await updateMovie.execute(movie);
            
            return response.status(201).json({ message: "Filme mudado!"});
        } catch (error) {
            return response.status(500).json({ error })
        }
    }
    
}

