export class BooksModel {
  _id: string;
  title: string;
  description?: string;
  authors?: string[];
  favorite?: string;
  fileCover?: string;
  fileName?: string;
}

export class BooksRepository {
  library: BooksModel[];

  create(dto: BooksModel): BooksModel {
    this.library.push(dto);
    return dto;
  }

  getById(id: string): BooksModel | null {
    const book = this.library.find((book) => book._id === id);
    return book || null;
  }

  getAll(): BooksModel[] {
    return this.library;
  }

  update(id: string, dto: BooksModel): BooksModel {
    const bookIndex = this.library.findIndex((book) => book._id === id);
    this.library[bookIndex] = {
      ...this.library[bookIndex],
      ...dto,
    };
    return this.library[bookIndex];
  }

  delete(id: string): 'Ok' | null {
    let isDeleted = false;
    this.library.filter((book) => {
      if (book._id !== id) return true;
      isDeleted = true;
      return false;
    });
    return isDeleted ? 'Ok' : null;
  }
}
