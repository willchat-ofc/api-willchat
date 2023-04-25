
export interface DeleteKeyRepositoryInput {
  key: string;
  accountId: string;
}

export interface DeleteKeyRepository {
  delete: (data: DeleteKeyRepositoryInput) => Promise<void>;
}

