export interface DeleteKeyInput {
  key: string;
  accountId: string;
}

export interface DeleteKey {
  delete: (data: DeleteKeyInput) => Promise<void>;
}
