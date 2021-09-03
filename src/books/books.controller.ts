import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksModel } from './books.model';

@Controller('books')
export class BooksController {
  @HttpCode(201)
  @Post()
  create(@Body() dto: Omit<BooksModel, '_id'>) {
    return dto;
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string) {
    return id;
  }

  @HttpCode(200)
  @Get()
  getAll() {
    return;
  }

  @HttpCode(202)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: BooksModel) {
    return dto;
  }

  @HttpCode(202)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return id;
  }
}
