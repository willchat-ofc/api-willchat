import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MessagesEntity } from "./message-postgresql-entity";

@Entity({ name: "chat" })
export class ChatEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @OneToMany(() => MessagesEntity, (messages) => messages.chat)
  public messages?: MessagesEntity;
}
