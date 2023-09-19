import { v4 } from "uuid";

export class UuidService {
  public static uuidv4(): string {
    return v4();
  }

  public static uuidv4WithoutDashes(): string {
    return this.uuidv4().replace(/-/g, "");
  }
}
