export interface SaveKeyInput {
  userId: string;
}

export interface SaveKey {
  save: (data: SaveKeyInput) => Promise<void>;
}
