import type { GenerateKey } from "../../data/protocols/generate-key";
import uid from "uid";

export class UtilGenerateKey implements GenerateKey {
  public generate(): string {
    const LENGTH = 10;
    return uid.uid(LENGTH);
  }
}
