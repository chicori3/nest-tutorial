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

@Controller('movies')
export class MoviesController {
	@Get()
	getAll() {
		return 'all movies';
	}

	@Get('search')
	search(@Query('year') searchingYear: string) {
		return `searching movie made after: ${searchingYear}`;
	}

	@Get('/:id')
	getOne(@Param('id') movieId: string) {
		return `movie id: ${movieId}`;
	}

	@Post()
	create(@Body() movieData) {
		console.log(movieData);
		return 'create movie';
	}

	@Delete('/:id')
	remove(@Param('id') movieId: string) {
		return `remove movie ${movieId}`;
	}

	@Patch('/:id')
	patch(@Param('id') movieId: string, @Body() updateData) {
		return {
			updatedMovie: movieId,
			...updateData,
		};
	}
}
