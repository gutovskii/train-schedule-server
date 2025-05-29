import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto, UserPayload } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findFirst({
      where: { username: dto.username },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.hashPassword))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new NotFoundException(`User ${dto.username} already exists`);
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        username: dto.username,
        hashPassword,
        isAdmin: true, // TODO: remove
      },
    });

    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
