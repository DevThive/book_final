import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  exports: [NotificationService],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
