import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(dto: AuthUserDto) {
    const user = await this.validateUser(dto);
    return await this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with such email exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newUser = await this.usersService.create({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: UserDocument) {
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_KEY,
      }),
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid email',
      });
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals) return user;
    throw new UnauthorizedException({
      message: 'Invalid password',
    });
  }
}
