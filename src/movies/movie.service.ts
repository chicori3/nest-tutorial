import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/movie.entity';
import { find } from 'rxjs';

@Injectable()
export class MovieService {
	private movies: Movie[] = [];

	getAll(): Movie[] {
		return this.movies;
	}

	getOne(id: string): Movie {
		const findMovie = this.movies.find((movie) => movie.id === +id);

		if (!findMovie) {
			throw new NotFoundException(`Not Found Movie with ID: ${id}`);
		}
		return findMovie;
	}

	deleteOne(id: string) {
		this.getOne(id);
		this.movies = this.movies.filter((movie) => movie.id !== +id);
	}

	create(movieData) {
		this.movies.push({
			id: this.movies.length + 1,
			...movieData,
		});
	}

	update(id: string, updateData) {
		const findMovie = this.getOne(id);
		this.deleteOne(id);
		this.movies.push({
			...findMovie,
			...updateData,
		});
	}
}
