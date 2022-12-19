import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entity/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	getAll(): Movie[] {
		return this.movieService.getAll();
	}

	@Get('search')
	search(@Query('year') searchingYear: string) {
		return `searching movie made after: ${searchingYear}`;
	}

	@Get('/:id')
	getOne(@Param('id') movieId: number) {
		return this.movieService.getOne(movieId);
	}

	@Post()
	create(@Body() movieData: CreateMovieDto) {
		return this.movieService.create(movieData);
	}

	@Delete('/:id')
	remove(@Param('id') movieId: number) {
		return this.movieService.deleteOne(movieId);
	}

	@Patch('/:id')
	patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
		return this.movieService.update(movieId, updateData);
	}
}
