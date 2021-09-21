import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto copy';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  create(dto: CreateUserDto): Promise<UserDocument> {
    return this.UserModel.create(dto);
  }

  getById(id: string): Promise<UserDocument | null> {
    return this.UserModel.findById(id).exec();
  }

  getByEmail(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ email }).exec();
  }

  getAll(): Promise<UserDocument[]> {
    return this.UserModel.find().exec();
  }

  update(id: string, dto: UpdateUserDto): Promise<UserDocument | null> {
    return this.UserModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  delete(id: string): Promise<UserDocument | null> {
    return this.UserModel.findByIdAndDelete(id).exec();
  }
}
