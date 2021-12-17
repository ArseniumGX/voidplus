import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Movies } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
@ApiTags('Movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movies> {
    return this.movieService.create(createMovieDto);
  }

  @Post('create-many')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  createMany(@Body() createMovieDto: CreateMovieDto[]): Promise<{ count: number }>{
    return this.movieService.createMany(createMovieDto);
  }

  @Get()
  findAll(): Promise<Movies[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Movies> {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto
  ): Promise<Movies> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.movieService.remove(id);
  }
}
