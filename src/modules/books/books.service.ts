import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly BookModel: Model<BookDocument>,
  ) {}

  create(dto: CreateBookDto): Promise<BookDocument> {
    return this.BookModel.create(dto);
  }

  getById(id: string): Promise<BookDocument | null> {
    return this.BookModel.findById(id).exec();
  }

  getAll(): Promise<BookDocument[]> {
    // throw new HttpException('test', HttpStatus.INTERNAL_SERVER_ERROR);
    return this.BookModel.find().exec();
  }

  update(id: string, dto: CreateBookDto): Promise<BookDocument | null> {
    return this.BookModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  delete(id: string): Promise<BookDocument | null> {
    return this.BookModel.findByIdAndDelete(id).exec();
  }
}
