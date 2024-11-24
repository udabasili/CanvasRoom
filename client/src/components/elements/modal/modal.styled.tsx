import styled from 'styled-components';

import colors from '@/constant/colors.ts';

type ModalProps = {
  show: boolean;
};
export const ModalOverlay = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.secondaryColor};
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: red;
  position: absolute;
  top: 0;
  right: 1.2rem;

  &:hover {
    color: red;
  }
`;

export const ModalBody = styled.div`
  font-size: 1rem;
  color: #333;
`;
