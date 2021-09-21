import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BooksModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:qwerty12345@netology.vvtgu.mongodb.net/library-netology',
      {
        useFindAndModify: false,
      },
    ),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
