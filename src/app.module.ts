import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/book.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BooksModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:qwerty12345@netology.vvtgu.mongodb.net/library-netology',
    ),
  ],
})
export class AppModule {}
