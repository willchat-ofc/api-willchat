export interface SaveKeyRepositoryInput {
  userId: string;
  key: string;
}

export interface SaveKeyRepository {
  save: (data: SaveKeyRepositoryInput) => Promise<void>;
}
