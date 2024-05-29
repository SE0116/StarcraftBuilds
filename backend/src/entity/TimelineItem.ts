import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TimelineItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  date!: Date;
}
