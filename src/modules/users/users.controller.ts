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
import { UpdateUserDto } from './dto/update-user.dto copy';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './users.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string): Promise<UserDocument | null> {
    return this.usersService.getById(id);
  }

  @HttpCode(200)
  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<UserDocument[]> {
    return this.usersService.getAll();
  }

  @HttpCode(202)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.usersService.update(id, dto);
  }

  @HttpCode(202)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<UserDocument | null> {
    return this.usersService.delete(id);
  }
}
