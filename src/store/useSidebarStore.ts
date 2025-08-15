import { create } from 'zustand';
import { SidebarConfiguration } from '../model/sidebar/SidebarConfiguration';
import sidebarDatabase from '../data/sidebarDatabase.json';

interface SidebarStoreState {
  config: SidebarConfiguration | null;
  setConfig: (config: SidebarConfiguration) => void;
}

export const useSidebarStore = create<SidebarStoreState>((set) => ({
  config: sidebarDatabase as SidebarConfiguration,
  setConfig: (config) => set({ config }),
}));