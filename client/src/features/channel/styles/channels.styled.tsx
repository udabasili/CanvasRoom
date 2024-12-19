import styled from '@emotion/styled';

import colors from '@/constant/colors.ts';
import { device } from '@/utils/responsive.ts';

type ChannelContainerProps = {
  isVisible?: boolean;
};

export const ChannelContainer = styled.div<ChannelContainerProps>`
  grid-column: full-start / col-start 3;
  background-color: ${colors.secondaryColor};
  height: 100%;
  transition: width 0.3s ease-in-out;

  ul {
    width: 100%;
  }

  li {
    padding: 1rem;
    cursor: pointer;

    &.active {
      background-color: ${colors.primaryColor};
      color: white;
    }
  }

  @media ${device.tabletPort} {
    position: fixed;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 40;
    width: ${(props) => (props.isVisible ? '50vw' : 0)};
  }

  @media ${device.mobile} {
    width: ${(props) => (props.isVisible ? '100vw' : 0)};
  }
`;
