import { createContext } from 'react';

export interface DrawerContextShape {
  activeKeys: string | string[];
  toggleActiveKey: (key: string) => void;
  setActiveKey: (key: string) => void;
  unsetActiveKey: (key: string) => void;
}

const noop = () => {
  // noop
};

export const DrawerContext = createContext<DrawerContextShape>({
  activeKeys: '',
  toggleActiveKey: noop,
  setActiveKey: noop,
  unsetActiveKey: noop
});
