import { Module } from '@nestjs/common';
import { BookReviewService } from './bookreview.service';
import { BookReviewController } from './bookreview.controller';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReview } from 'src/entity/bookreview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BookReview])],
  controllers: [BookReviewController],
  providers: [BookReviewService],
})
export class BookReviewModule {}
export { BookReviewService };
