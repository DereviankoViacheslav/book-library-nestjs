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
import { BookDocument } from './book.model';
import { BooksService } from './book.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @HttpCode(201)
  @Post()
  create(@Body() dto: Omit<BookDocument, '_id'>): Promise<BookDocument> {
    return this.bookService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string): Promise<BookDocument | null> {
    return this.bookService.getById(id);
  }

  @HttpCode(200)
  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @HttpCode(202)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: BookDocument,
  ): Promise<BookDocument | null> {
    return this.bookService.update(id, dto);
  }

  @HttpCode(202)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<BookDocument | null> {
    return this.bookService.delete(id);
  }
}
