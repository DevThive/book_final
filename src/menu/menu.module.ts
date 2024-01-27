import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Store } from '../entity/store.entity';
import { UserService } from '../user/user.service';
import { Menu } from '../entity/menu.entity';
import { MyPage } from 'src/entity/my-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, User, Store, MyPage])],
  providers: [MenuService, UserService],
  controllers: [MenuController],
})
export class MenuModule {}
