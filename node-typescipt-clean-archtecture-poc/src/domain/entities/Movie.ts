

type MovieProps = {
    title: string; 
    synopsis: string; 
}

export class Movie { 
    public readonly id: string;
    public title: string; 
    public synopsis: string; 

    constructor(movie: Omit<MovieProps, 'id'>, id?: string) {
        Object.assign(this, movie);
        this.id = id ? id : 'abcdef123456'; 
    }

}