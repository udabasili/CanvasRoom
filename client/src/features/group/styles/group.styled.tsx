import styled from '@emotion/styled';

import colors from '@/constant/colors.ts';
import { device } from '@/utils/responsive.ts';

export const GroupContainer = styled.aside`
  grid-column: side-start / side-end;
  background-color: ${colors.primaryColor};
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  hr {
    width: 100%;
    border-color: black;

    @media ${device.tabletPort} {
      display: none;
    }
  }

  @media ${device.tabletPort} {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 10vh;
    z-index: 100;
    flex-direction: row;
  }
`;

export const CircleIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin: 1rem 0;
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &.selected {
    background-color: white;
  }
`;

/*
----------------                 Group Modal               ------------------------
* **/

export const Menu = styled.ul`
  width: 100%;
  height: 100%;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
  border: 2px solid lightgray;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primaryColor};
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

export const Text = styled.span`
  flex: 1;
  margin-left: 15px;
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

export const Arrow = styled.div`
  color: black;
  font-size: 18px;
`;

/**
 * ----------------                 Groups               ------------------------
 */

export const GroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
  overflow-y: auto;
  padding: 1rem 0.5rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  margin-top: 20px;
`;
