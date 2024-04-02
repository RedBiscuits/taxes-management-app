import { BaseModel } from "./BaseModel";

export type Log = BaseModel & {
  content: string;
  version: string
};
