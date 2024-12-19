import styled from '@emotion/styled';

import { device } from '@/utils/responsive.ts';

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #202225;
  color: #ffffff;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;
  height: 10%;

  @media ${device.tabletPort} {
    justify-content: space-between;
    height: 10vh;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    justify-self: end;
  }
`;
