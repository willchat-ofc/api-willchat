import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  public chat: ChatEntity;
}
