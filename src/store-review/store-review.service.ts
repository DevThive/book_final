import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entity/store.entity';
import { User } from '../entity/user.entity';
import { StoreReview } from '../entity/storeReview.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class StoreReviewService {
  constructor(
    @InjectRepository(StoreReview)
    private storeReviewRepository: Repository<StoreReview>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  //리뷰 생성
  async createStoreReview(
    storeId: number,
    userId: number,
    createStoreReviewDto: CreateStoreReviewDto,
  ) {
    const user = await this.userService.findUserById(userId);
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (user.role !== 0) {
      throw new BadRequestException('사장님은 일반 리뷰를 등록할 수 없습니다.');
    }

    if (!store) {
      throw new BadRequestException('존재하지 않는 가게입니다.');
    }

    const review = await this.storeReviewRepository.save({
      ...createStoreReviewDto,
      user_id: userId,
      store_id: storeId, //DB: 변수
    });

    return review;
  }

  //모든 리뷰 조회
  async findReviewList(storeId: number) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });
    if (!store) throw new BadRequestException('지점이 존재하지 않습니다.');
    const reviewlist = await this.storeReviewRepository.find({
      where: { store_id: storeId },
    });
    if (!reviewlist)
      throw new BadRequestException('해당 지점에 대한 리뷰가 없습니다.');
    return reviewlist;
  }

  //단일 리뷰 조회
  async findOneReview(storeid: number, reviewid: number) {
    const review = await this.storeReviewRepository.findOne({
      where: { store_id: storeid, id: reviewid },
    });
    if (!review) throw new BadRequestException('리뷰를 찾을 수 없습니다.');
    console.log(review); //코드 체크
    return review;
  }

  //리뷰 수정
  async editOneReview(
    storeid: number,
    reviewid: number,
    userid: number,
    updateStoreReviewDto: UpdateStoreReviewDto,
  ) {
    const review = await this.storeReviewRepository.findOne({
      where: { store_id: storeid, id: reviewid },
    });

    if (!review) throw new BadRequestException('리뷰를 찾을 수 없습니다.');
    if (userid !== review.user_id) {
      throw new BadRequestException('작성자만 리뷰를 수정할 수 있습니다.');
    }
    await this.storeReviewRepository.update(
      {
        id: reviewid,
      },
      {
        ...updateStoreReviewDto,
      },
    );

    return { message: '리뷰가 수정되었습니다.' };
  }

  async deleteOneReview(storeid: number, reviewid: number, userid: number) {
    const review = await this.storeReviewRepository.findOne({
      where: { store_id: storeid, id: reviewid },
    });

    if (!review) throw new BadRequestException('리뷰를 찾을 수 없습니다.');
    if (userid !== review.user_id) {
      throw new BadRequestException('작성자만 리뷰를 삭제할 수 있습니다.');
    }
    const result = await this.storeReviewRepository.delete({ id: reviewid });

    return result;
  }
}
