import { MessageData } from "../model/message/MessageData";
import { create } from 'zustand';
import messageDatabase from '../data/messageDatabase.json';

interface MessageStoreState {
  config: MessageData | null;
  setConfig: (config: MessageData) => void;
}

export const useMessageStore = create<MessageStoreState>((set) => ({
  config: messageDatabase as MessageData,
  setConfig: (config) => set({ config }),
}));