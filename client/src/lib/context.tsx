import React, { createContext } from 'react';

import { useDisclosure } from '@/hook/use-disclosure.ts';

type SideSectionVisibilityContext = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

export const ThemeContext = createContext<SideSectionVisibilityContext | null>(
	null,
);

type AppContextProps = {
	children: React.ReactNode;
};

export default function AppContext({ children }: AppContextProps) {
	const { open, close, isOpen } = useDisclosure();

	return (
		<ThemeContext.Provider
			value={{
				isOpen,
				open,
				close,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}
