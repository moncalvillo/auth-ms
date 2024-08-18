import { randomBytes, createHash } from "crypto";

export class CryptoService {
  public static createHash = (key?: string): string => {
    const salt = randomBytes(16).toString("hex");

    const hash = createHash("sha256");
    hash.update(key ? `${key}-${salt}` : salt);

    return hash.digest("hex");
  };
}
