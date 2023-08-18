import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChatEntity } from "./chat-postgresql-entity";

@Entity({ name: "messages" })
export class MessagesEntity {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public message!: string;

  @Column()
  public userName!: string;

  @Column()
  public userId!: string;

  @CreateDateColumn({
    type: process.env.JEST_WORKER_ID ? "numeric" : "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  public createdAt?: Date;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  public chat: ChatEntity;
}
