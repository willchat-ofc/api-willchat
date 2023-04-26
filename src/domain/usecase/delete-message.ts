export interface DeleteMessageInput {
  key: string;
  messageId: string;
  accountId: string;
}

export interface DeleteMessage {
  delete: (data: DeleteMessageInput) => Promise<void>;
}
