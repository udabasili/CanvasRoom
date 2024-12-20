import React, { createContext } from 'react';

import { useDisclosure } from '@/hook/use-disclosure.ts';

type SideSectionVisibilityContext = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const SideSectionContext =
  createContext<SideSectionVisibilityContext | null>(null);

type AppContextProps = {
  children: React.ReactNode;
};

export default function SideDrawerContext({ children }: AppContextProps) {
  const { open, close, isOpen } = useDisclosure();

  return (
    <SideSectionContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}
    >
      {children}
    </SideSectionContext.Provider>
  );
}
