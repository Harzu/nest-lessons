import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Controller('api/v1')
export class AppController {
  @Get('/echo')
  getEcho(@Req() req, @Res() res, @Body() body) {
    res.status(200).json(body);
  }

  @Get('/premium-echo')
  @UseGuards(JwtAuthGuard)
  getPremiumEcho(@Req() req, @Res() res, @Body() body) {
    res.status(200).json(body);
  }
}
