import {
    CloseButton, ModalBody,
    ModalContainer,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalTitle
} from "./modal.styled";
import {ReactNode} from "react";

type ModalProps = {
    show: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    onConfirm: () => void;
}

export const Modal = ({show, onClose, title, children, onConfirm}: ModalProps) => {
    return (
        <ModalOverlay show={show}>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <button className="btn btn-error mr-2" onClick={onClose}>Cancel</button>
                    <button className="btn btn-active" onClick={onConfirm}>
                        Confirm
                    </button>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};