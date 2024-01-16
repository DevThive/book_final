import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { refreshTokenGuard } from './guard/refresh-token.guard';
import { accessTokenGuard } from './guard/access-token.guard';
import { Request } from 'express';
import { SignupAdminDto } from './dto/signup-admin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
  }

  @Post('signup/admin')
  adminsignup(@Body() signupadminDto: SignupAdminDto) {
    return this.authService.adminsignup(signupadminDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiBearerAuth('refreshToken')
  @UseGuards(refreshTokenGuard)
  @Post('refresh')
  refresh(@Req() req: Request) {
    const userId: number = (req.user as any).userId;

    if (!userId) {
      throw new UnauthorizedException('로그인 오류입니다.');
    }

    return this.authService.refresh(userId);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    const userId: number = (req.user as any).userId;

    if (!userId) {
      throw new UnauthorizedException('로그인 오류입니다.');
    }

    return this.authService.logout(userId);
  }

  //   //네이버 로그인
  //   @UseGuards(AuthGuard('naver'))
  //   @Get('/naver/login')
  //   async loginNaver(@Req() req: Request, @Res() res: Response): Promise<any> {
  //     try {
  //       return await this.authService.OAuthLogin({ req, res });
  //     } catch (error) {
  //       console.error('Error in loginNaver:', error);
  //       (res as any).status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res): Promise<void> {
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('https://localhost:3000/login/success/' + jwt);
    else res.redirect('https://localhost:3000/login/failure');
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
