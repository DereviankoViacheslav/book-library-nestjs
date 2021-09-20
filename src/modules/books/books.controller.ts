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
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { BookDocument } from './books.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookSchema } from './joi/create-book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @HttpCode(201)
  @Post()
  create(
    @Body(new JoiValidationPipe(CreateBookSchema)) dto: CreateBookDto,
  ): Promise<BookDocument> {
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
    console.log('BooksController/getAll --->>>');
    return this.bookService.getAll();
  }

  @HttpCode(202)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateBookDto,
  ): Promise<BookDocument | null> {
    return this.bookService.update(id, dto);
  }

  @HttpCode(202)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<BookDocument | null> {
    return this.bookService.delete(id);
  }
}
