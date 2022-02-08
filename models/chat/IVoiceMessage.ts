import { IMessage } from "./Imessage";

export interface IVoiceMessage extends IMessage  {
  body: {
    url: string,
    createdAt: { seconds: number }
  }
}