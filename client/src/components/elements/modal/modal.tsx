import { ReactNode } from 'react';

import {
	CloseButton,
	ModalBody,
	ModalContainer,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalTitle,
} from './modal.styled';

type ModalProps = {
	show: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	onConfirm: () => void;
	footer?: ReactNode;
};

export const Modal = ({
	show,
	onClose,
	title,
	children,
	footer,
}: ModalProps) => {
	return (
		<ModalOverlay show={show}>
			<ModalContainer>
				<ModalHeader>
					<ModalTitle className="text-3xl font-bold dark:text-white">
						{title}
					</ModalTitle>
					<CloseButton onClick={onClose}>&times;</CloseButton>
				</ModalHeader>
				<ModalBody>{children}</ModalBody>
				<ModalFooter>{footer}</ModalFooter>
			</ModalContainer>
		</ModalOverlay>
	);
};
