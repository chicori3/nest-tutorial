import { Module } from '@nestjs/common';
import { MovieController } from './movies/movie.controller';
import { MovieService } from './movies/movie.service';

@Module({
	imports: [],
	controllers: [MovieController],
	providers: [MovieService],
})
export class AppModule {}
