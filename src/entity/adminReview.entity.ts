import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { Store } from './store.entity';
import { StoreReview } from './storeReview.entity';
@Entity({
  name: 'admin_review',
})
export class AdminReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @Column({ name: 'store_review_id' })
  storeReviewId: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Store, (store) => store.adminReviews)
  store: Relation<Store>;

  @ManyToOne(() => StoreReview, (store_review) => store_review.admin_review)
  store_review: Relation<StoreReview>[];
}
