import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StorebookService } from './store-book.service';
import { NotificationService } from '../notification/notification.service';
import { CreateStoreBookDto } from './dto/create-storebook.dto';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { UpdateStoreBookDto } from './dto/update-storebook.dto';

@Controller('storebook')
export class StorebookController {
  constructor(
    private readonly storebookService: StorebookService,
    private readonly notificationService: NotificationService,
  ) {}

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

  @Get('')
  async getBooksInStore() {
    return await this.storebookService.getBooksInStore();
  }

  @Get('/:storebookid')
  async getStoreBookById(@Param('storebookid') storebookid: number) {
    return await this.storebookService.getStoreBookById(storebookid);
  }

  @Put('/:bookid')
  async updateStoreBook(
    @Param('bookid') bookid: number,
    @UserId() userid: number,
    @Body() updateStoreBookDto: UpdateStoreBookDto,
  ) {
    return await this.storebookService.updateStoreBook(
      bookid,
      userid,
      updateStoreBookDto,
    );
  }

  @Delete('/:storebookid')
  async deleteStoreBook(
    @Param('bookid') bookid: number,
    @UserId() userid: number,
  ) {
    return await this.storebookService.deleteStoreBook(bookid, userid);
  }
}
