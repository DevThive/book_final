import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'applyowner',
})
export class ApplyOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner_name: string;

  @Column()
  business_license_number: number;

  @Column()
  business_location: string;

  @Column({ default: false })
  Authorized: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
