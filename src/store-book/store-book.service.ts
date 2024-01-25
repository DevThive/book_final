import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { StoreBook } from 'src/entity/store-book.entity';
import { StoreService } from 'src/store/store.service';
import { Repository } from 'typeorm';
import { CreateStoreBookDto } from './dto/create-storebook.dto';
import { Store } from 'src/entity/store.entity';
import { Book } from 'src/entity/book.entity';
import { UserService } from 'src/user/user.service';
import { UpdateStoreBookDto } from './dto/update-storebook.dto';

@Injectable()
export class StorebookService {
  constructor(
    @InjectRepository(StoreBook)
    private storeBookRepository: Repository<StoreBook>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    private readonly bookService: BookService,
    private readonly storeService: StoreService,
    private readonly userService: UserService,
  ) {}

  //지점도서 등록
  async createStoreBook(
    storeid: number,
    bookid: number,
    createStoreBookDto: CreateStoreBookDto,
  ) {
    const book = await this.bookRepository.findOne({
      where: { id: bookid },
    });
    const store = await this.storeRepository.findOne({
      where: { id: storeid },
    });

    if (!book || !store) {
      throw new BadRequestException('도서 또는 지점을 찾을 수 없습니다.');
    }

    const storebook = await this.storeBookRepository.save({
      book_id: bookid,
      store_id: storeid,
      ...createStoreBookDto,
    });
    console.log('storebook', storebook);
    return storebook;
  }

  //지점도서 조회
  async getBooksInStore() {
    const booksInStore = await this.storeBookRepository.find({});

    return booksInStore;
  }
  //지점도서 상세조회
  async getStoreBookById(storebookid: number) {
    const storebook = await this.storeBookRepository.findOne({
      where: { id: storebookid },
    });

    return storebook;
  }

  // 지점도서 수정
  async updateStoreBook(
    bookid: number,
    userid: number,
    updateStoreBookDto: UpdateStoreBookDto,
  ) {
    const user = await this.userService.findUserById(userid);
    const book = await this.bookRepository.findOne({
      where: { id: bookid },
    });

    if (!book) {
      throw new NotFoundException('존재하지 않는 도서입니다.');
    }

    // const storeBook = await this.storeBookRepository.findOne({
    //   where: { book: { id: bookid } },
    //   relations: { store: true },
    // });
    // console.log('storeBook', storeBook);
    // if (
    //   !storeBook ||
    //   user.stores.every((store) => store.id !== storeBook.store.id)
    // ) {
    //   throw new BadRequestException('지점 사장님만 삭제가 가능합니다.');
    // }

    await this.storeBookRepository.update(
      {
        id: bookid,
      },
      { ...updateStoreBookDto },
    );
    // console.log('storebook', storebook);
    return { message: '도서 정보가 수정되었습니다.' };
  }

  // 지점도서 삭제
  async deleteStoreBook(storebookid: number, userid: number) {
    const user = await this.userService.findUserById(userid);
    const book = await this.storeBookRepository.findOne({
      where: { id: storebookid },
    });

    if (!book) {
      throw new NotFoundException('존재하지 않는 도서입니다.');
    }

    // const storeBook = await this.storeBookRepository.findOne({
    //   where: { book: { id: bookid } },
    //   relations: { store: true },
    // });
    // console.log('storeBook', storeBook);
    // if (
    //   !storeBook ||
    //   user.stores.every((store) => store.id !== storeBook.store.id)
    // ) {
    //   throw new BadRequestException('지점 사장님만 삭제가 가능합니다.');
    // }
    console.log('storebookid', storebookid);
    await this.storeBookRepository.delete({ id: storebookid });

    return { message: '도서 정보가 삭제되었습니다.' };
  }
}