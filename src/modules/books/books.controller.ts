import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { BookDocument } from './books.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookSchema } from './joi/create-book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @HttpCode(201)
  @Post()
  create(
    @Body(new JoiValidationPipe(CreateBookSchema)) dto: CreateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string): Promise<BookDocument | null> {
    return this.booksService.getById(id);
  }

  @HttpCode(200)
  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @HttpCode(202)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: CreateBookDto,
  ): Promise<BookDocument | null> {
    return this.booksService.update(id, dto);
  }

  @HttpCode(202)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<BookDocument | null> {
    return this.booksService.delete(id);
  }
}
