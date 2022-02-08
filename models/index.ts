import User from './types'
import useUploadDataReult from "./hooks/IuseUploadDataReult";
import uerInputValueArr from './hooks/IsuerInputValueArr'
import UserInput from "./userInterfaces/IUserInput";
import SidebarItem from './utils/ISidebarItem'
import ChannelItem from './utils/ISidebarItem'
import Message from './chat/Imessage'
import Room  from './chat/IChat'
import Reaction from './chat/Ireaction'
import Doc from './chat/IDocument'
import React, { ReactElement } from 'react';

export interface IuseUploadDataReult extends useUploadDataReult {}
export interface IuserInputValueArr extends uerInputValueArr {}
export interface IUserInput extends UserInput {}
export interface ISidebarItem extends SidebarItem {}
export interface IChannelItem extends ChannelItem {}
export interface IMessage extends Message {}
export interface IUser extends User {}
export interface IRoom extends Room {} 
export interface IReaction extends Reaction {}
export interface IDropItem extends SidebarItem {}
export interface IAnswear extends IMessage {}
export interface IDocument extends Doc {}

export type {IVoiceMessage} from './chat/IVoiceMessage'

export interface IConItem {
  Icon: ReactElement<any, any>,
  id: number | string,
  onClick: () => Promise<void>
}

export interface IMageMessage extends Message {
  body: {
    url: string,
    id: number
  }[]
}

export interface IMageInterface {
  url: string,
  id: number
}

export type {IBoard, IDraw} from './draw/IDrawBoard'
export type { IToolItem } from './draw/IToolItem'