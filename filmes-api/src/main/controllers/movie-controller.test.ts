import { Router } from "express";
import { MovieController } from "./movie.controller";


describe('Movie Controller', () => {

    let movieController: MovieController;

    beforeAll(() => {
        movieController = new MovieController();
    });

    test('Constructor', () => {
        expect(movieController.path).toEqual('/movies');
        expect(typeof movieController.router).toBeInstanceOf(Router);
    });

});