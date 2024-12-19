import styled from '@emotion/styled';

import { device } from '@/utils/responsive.ts';

export const DashboardContainer = styled.section`
  grid-template-columns: inherit;
  grid-column: side-start / full-end;
  height: 100vh;
  display: grid;
`;

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  @media ${device.tabletPort} {
    display: block;
  }
`;

export const CloseButton = styled.span`
  display: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  @media ${device.tabletPort} {
    display: block;
  }
`;

export const ChatContainer = styled.section`
  grid-column: col-start 3 / full-end;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  @media ${device.tabletPort} {
    grid-column: side-start / full-end;
    height: 90vh;
  }
`;
