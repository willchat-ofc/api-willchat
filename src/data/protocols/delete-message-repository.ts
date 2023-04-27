export interface DeleteMessageRepositoryInput {
  key: string;
  messageId: string;
  accountId: string;
}

export interface DeleteMessageRepository {
  delete: (data: DeleteMessageRepositoryInput) => Promise<void>;
}
