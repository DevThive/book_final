import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StorebookService } from './store-book.service';
import { NotificationService } from '../notification/notification.service';
import { CreateStoreBookDto } from './dto/create-storebook.dto';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { UpdateStoreBookDto } from './dto/update-storebook.dto';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';

@Controller('storebook')
export class StorebookController {
  constructor(
    private readonly storebookService: StorebookService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(accessTokenGuard)
  @Post('/:storeid/:bookid')
  async createStoreBook(
    @Param('storeid') storeid: number,
    @Param('bookid') bookid: number,
    @Body() createStoreBookDto: CreateStoreBookDto,
  ) {
    console.log('storeid', storeid, 'bookid', bookid);

    const createdBook = await this.storebookService.createStoreBook(
      storeid,
      bookid,
      createStoreBookDto,
    );

    //책이름, 지점이름 보냄
    //북아이디와 스토어 아이디로 데이터에 저장함으로써 추후 이름이 바뀌어도 다 바뀔수 있도록함
    const notifyUser = await this.notificationService.createNotification(
      bookid,
      storeid,
    );
    console.log('notifyUser:', notifyUser);
    return createdBook;
  }

  //해당지점의 도서 전체조회
  @Get('/:storeid')
  getStoreBooks(@Param('storeid') storeid: number) {
    return this.storebookService.getStoreBooks(storeid);
  }

  @Get('')
  async getBooksInStore() {
    return await this.storebookService.getBooksInStore();
  }

  @Get('/:storebookid')
  async getStoreBookById(@Param('storebookid') storebookid: number) {
    return await this.storebookService.getStoreBookById(storebookid);
  }

  // @Get('/:storeid/storebooksearch')
  // async searchStorebooks(
  //   @Query('title') title: string,
  //   @Param('storeid') storeid: number,
  // ) {
  //   return await this.storebookService.searchStorebooks(title, storeid);
  // }

  @UseGuards(accessTokenGuard)
  @Put('/:storeid/:bookid')
  async updateStoreBook(
    @Param('bookid') bookid: number,
    @Param('storeid') storeid: number,
    @UserId() userid: number,
    @Body() updateStoreBookDto: UpdateStoreBookDto,
  ) {
    return await this.storebookService.updateStoreBook(
      bookid,
      userid,
      storeid,
      updateStoreBookDto,
    );
  }

  @UseGuards(accessTokenGuard)
  @Delete('/:storeid/:storebookid')
  async deleteStoreBook(
    @Param('storeid') storeid: number,
    @Param('storebookid') bookid: number,
    @UserId() userid: number,
  ) {
    console.log(storeid, bookid);
    return await this.storebookService.deleteStoreBook(bookid, userid, storeid);
  }
}
