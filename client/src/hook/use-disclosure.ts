import { useCallback, useState } from 'react';

export const useDisclosure = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const open = useCallback(() => {
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const toggle = useCallback(() => {
		setIsOpen((isOpen) => !isOpen);
	}, []);

	return {
		open,
		close,
		toggle,
		isOpen,
	};
};
