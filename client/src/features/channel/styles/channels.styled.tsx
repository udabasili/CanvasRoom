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

  ul {
    width: 100%;
  }

  li {
    padding: 1rem;
    cursor: pointer;

    &.active {
      opacity: 0.8;
    }
  }

  @media ${device.tabletPort} {
    position: fixed;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 40;
    width: ${(props) => (props.isVisible ? '50vw' : 0)};
    transition: width 0.5s;
  }
`;
