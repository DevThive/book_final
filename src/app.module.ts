import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigProjectModule } from './config/config.module';

import { StoreModule } from './store/store.module';
import { AdminReviewModule } from './admin-review/adminReview.module';
import { StoreReviewModule } from './store-review/store-review.module';
import { MenuModule } from './menu/menu.module';
import { BookModule } from './book/book.module';
import { MyPageModule } from './my-page/my-page.module';
import { BookReviewModule } from './bookreview/bookreview.module';
import { RedisModule } from './configs/redis/redis.module';
import { ReceiptModule } from './receipt/receipt.module';
import { MapModule } from './map/map.module';
import { ApiModule } from './api/api.module';

import { StorebookModule } from './store-book/store-book.module';

import { TypeormModule } from './typeorm/typeorm.module';
import { NotificationModule } from './notification/notification.module';
import { SseModule } from './sse/sse.module';
import { ApplyOwnerModule } from './apply-owner/apply-owner.module';
import { GiftController } from './gift/gift.controller';
import { GiftService } from './gift/gift.service';
import { GiftModule } from './gift/gift.module';
import { GiftuserController } from './giftuser/giftuser.controller';
import { GiftuserService } from './giftuser/giftuser.service';
import { GiftuserModule } from './giftuser/giftuser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigProjectModule,
    TypeormModule.forRoot(),
    UserModule,
    AuthModule,
    StoreModule,
    MenuModule,
    AdminReviewModule,
    StoreReviewModule,
    BookReviewModule,
    BookModule,
    MyPageModule,
    RedisModule,
    ReceiptModule,
    MapModule,
    ApiModule,
    NotificationModule,
    StorebookModule,
    SseModule,
    ReceiptModule,
    ApplyOwnerModule,
    GiftModule,
    GiftuserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
