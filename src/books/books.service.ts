import { Inject, Injectable } from '@nestjs/common';
import { BooksModel, BooksRepository } from './books.model';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BooksRepository) private readonly booksRepository: BooksRepository,
  ) {}

  create(dto: BooksModel): BooksModel {
    return this.booksRepository.create(dto);
  }

  getById(id: string): BooksModel | null {
    return this.booksRepository.getById(id);
  }

  getAll(): BooksModel[] {
    return this.booksRepository.getAll();
  }

  update(id: string, dto: BooksModel): BooksModel {
    return this.booksRepository.update(id, dto);
  }

  delete(id: string): 'Ok' | null {
    return this.booksRepository.delete(id);
  }
}
