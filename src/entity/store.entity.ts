import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Menu } from './menu.entity';
import { StoreBook } from './storeBook.entity';
import { StoreReview } from './storeReview.entity';
import { AdminReview } from './adminReview.entity';
import { Receipt } from './receipt.entity';
import { Point } from 'wkx';

@Entity({
  name: 'store',
})
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.stores)
  admin: Relation<User>;

  @OneToMany(() => StoreBook, (storebook) => storebook.store)
  storebook: Relation<StoreBook>;

  @ManyToOne(() => Store, (store) => store.storebook, { cascade: true })
  store: Relation<Store>;

  @Column()
  store_name: string;

  @Column()
  store_desc: string;

  @Column()
  store_img: string;

  @Column()
  store_address: string;

  @Column({ type: 'point', nullable: true })
  place?: Point;

  @OneToMany(() => Menu, (menu) => menu.store)
  menus: Relation<Menu>[];

  @OneToMany(() => AdminReview, (adminReview) => adminReview.store)
  adminReviews: Relation<AdminReview>[];

  @OneToMany(() => StoreReview, (storeReview) => storeReview.store)
  store_reviews: Relation<StoreReview>[];

  @OneToMany(() => Receipt, (receipt) => receipt.store)
  receipts: Relation<Receipt>[];

  @Column({ type: 'varchar' })
  store_open: string;

  @Column({ type: 'varchar' })
  store_close: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
