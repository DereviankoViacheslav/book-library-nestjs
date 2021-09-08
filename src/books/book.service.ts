import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly BookModel: Model<BookDocument>,
  ) {}

  create(dto: BookDocument): Promise<BookDocument> {
    return this.BookModel.create(dto);
  }

  getById(id: string): Promise<BookDocument | null> {
    return this.BookModel.findById(id).exec();
  }

  getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  update(id: string, dto: BookDocument): Promise<BookDocument | null> {
    return this.BookModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  delete(id: string): Promise<BookDocument | null> {
    return this.BookModel.findByIdAndDelete(id).exec();
  }
}
