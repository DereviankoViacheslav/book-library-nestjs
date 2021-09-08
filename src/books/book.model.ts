import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  authors?: string[];

  @Prop()
  favorite?: string;

  @Prop()
  fileCover?: string;

  @Prop()
  fileName?: string;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
