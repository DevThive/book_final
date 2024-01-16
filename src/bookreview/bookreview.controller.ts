import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookReviewService } from './bookreview.service';
import { CreateBookReviewDto } from './dto/create-bookreview.dto';
import { UpdateBookReviewDto } from './dto/update-bookreview.dto';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

@Controller('books/:bookId/reviews')
export class BookReviewController {
  constructor(private readonly bookReviewService: BookReviewService) {}

  @UseGuards(accessTokenGuard)
  @Post()
  create(
    @Param('bookId') book_id: number,
    @Request() req: any,
    @Body() createBookReviewDto: CreateBookReviewDto,
  ) {
    const userId = req.user.userId; //
    return this.bookReviewService.create(book_id, userId, createBookReviewDto);
  }

  @Get()
  findAll(@Param('bookId') book_id: number = 1) {
    // 1로 현재 디폴트를 준 상태
    return this.bookReviewService.findAll(book_id);
  }

  @Get(':id')
  findOne(@Param('bookId') book_id: number, @Param('id') id: number) {
    return this.bookReviewService.findOne(book_id, id);
  }

  @UseGuards(accessTokenGuard)
  @Put(':id')
  update(
    @Param('bookId') book_id: number,
    @Param('id') id: number,
    @UserId() userId: number,
    @Body() updateBookReviewDto: UpdateBookReviewDto,
  ) {
    return this.bookReviewService.update(
      book_id,
      id,
      userId,
      updateBookReviewDto,
    );
  }

  @UseGuards(accessTokenGuard)
  @Delete(':id')
  remove(
    @Param('bookId') book_id: number,
    @Param('id') id: number,
    @Request() req: any,
  ) {
    const userId = req.user.userId; // JWT AccessToken에서 userId 가져오기
    return this.bookReviewService.remove(book_id, id, userId);
  }
}
